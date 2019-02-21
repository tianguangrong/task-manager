import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  FormBuilder, 
  FormGroup, 
  FormControl, 
  ControlValueAccessor 
} from '@angular/forms';
import { Address } from '../../domain';
import { getProvinces, getAreaByCity, getCityByProvince} from '../../utils/area.util'

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>AreaListComponent),
      multi:true
    },
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>AreaListComponent),
      multi:true

    }
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private propagateChange = (_:any) => {}

  private _address:Address = {
    province:"",
    city:"",
    district:"",
    street:"",
  }

  private sub:Subscription;

  public _province = new Subject();
  public _city = new Subject();
  public _district = new Subject();
  public _street = new Subject();

  provinces$:Observable<string[]>;
  cities$:Observable<string[]>;
  districts$:Observable<string[]>;

  constructor() { }

  writeValue(obj: Address): void{
    if(obj){
      this._address = obj;
      if(this._address.province){
        this._province.next(this._address.province)
      }
      if(this._address.city){
        this._city.next(this._address.city)
      }
      if(this._address.district){
        this._district.next(this._address.district)
      }
    }
  }

  registerOnChange(fn: any): void{
    this.propagateChange = fn ;
  }

  registerOnTouched(fn: any): void{

  }

  ngOnInit() {
    const province$ = this._province.asObservable().startWith("");
    const city$ = this._city.asObservable().startWith("");
    const district$ = this._district.asObservable().startWith("");
    const street$ = this._street.asObservable().startWith("");

    const val$ = Observable.combineLatest(([province$,city$,district$,street$]),(_p,_c,_d,_s)=>{
      return {
        province:_p,
        city:_c,
        district:_d,
        street:_s
      };
    });

    this.sub = val$.subscribe(v=>{
      this.propagateChange(v);
    })

    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = province$.map((p:string) => getCityByProvince(p));
    this.districts$ = Observable.combineLatest(([province$,city$]),(p,c)=>{
      return getAreaByCity(p,c);
    })


  }

  ngOnDestroy(): void{
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  
  validate(c:FormControl):{[key:string]:any}{
    const value = c.value
    if(!value){
      return null;
    }
    if(value.provide && value.city && value.district && value.street){
      return null;
    }
    return {
      isInValid:true
    }
  }

  onProvinceChange(){
    this._province.next(this._address.province)
  }

  onCityChange(){
    this._city.next(this._address.city)
  }

  onDistrictChange(){
    this._district.next(this._address.district)
  }

  onStreetChange(){
    this._street.next(this._address.street)
  }

}

