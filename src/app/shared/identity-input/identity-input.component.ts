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
import { IdentityType, Identity } from '../../domain';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>IdentityInputComponent),
      multi:true
    },
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>IdentityInputComponent),
      multi:true

    }
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  //设置一个匿名函数,接受传过来的聚柄;
  private propagateChange = (_:any) => {};
  //设置  证件类型
  identityTypes = [
    {
      value:IdentityType.IdCard,label:'身份证'
    },
    {
      value:IdentityType.Insurance,label:'医保'
    },
    {
      value:IdentityType.Military,label:'军官证'
    },
    {
      value:IdentityType.Passport,label:'护照'
    },
    {
      value:IdentityType.Other,label:'其他'
    }
  ];
  //设置属性,用于页面 ngModel的接受与发送
  identity:Identity={identityType:null,identityNo:null};
  //实例化 Subject ,用于作为流接受输入的信息.
  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  //将Subject转换成流.
  get idType():Observable<IdentityType>{
    return this._idType.asObservable();
  }
  get idNo():Observable<string>{
    return this._idNo.asObservable();
  }
  //实例Subscription,用于页面关闭时的销毁
  private sub:Subscription;

  constructor() { }
  //将模块里的流传到自定义组件中
  writeValue(obj: any): void{
    if(obj){
      this.identity = obj;
    }
  }
  //将自定义组件的流告知模块并同步改变
  registerOnChange(fn: any): void{
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

  ngOnInit() {
    const val$ = Observable.combineLatest([this.idType,this.idNo],(_type ,_No) =>{
      return {
        identityType:_type,
        identityNo:_No
      }
    })
    //订阅这个流；
    this.sub = val$.subscribe((id)=>{
      this.propagateChange(id);
    });

  }
  //销毁流
  ngOnDestroy(): void{
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  //将信息的值传入流
  private onIdTypeChange(idType:IdentityType){
    this._idType.next(idType);
  }
  private onIdNoChange(idNo:string){
    this._idNo.next(idNo);
  }
  //自定义校验
  validate(c:FormControl):{[key:string]:any}{
    const val = c.value
    if(!val){
      return null ;
    }
    switch (val.identityType) {
      case IdentityType.IdCard:
        
       return this.validateIdCard(c);
       case IdentityType.Passport:
        
       return this.validatePassport(c);
       case IdentityType.Military:
        
       return this.validateMilitary(c);
       case IdentityType.Insurance:
      default:{
        return null;
      }
    }
  }
  //动态验证细则
  validateIdCard(c:FormControl):{[key:string]:any} {
    const val = c.value.identityNo
    if(val.length != 18){
      return {
        IdInvlid:true
      };
    } 
    const regIdCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
    regIdCard.test(val) ? null : {
      isNoValid:true
    }
  }
  validatePassport(c:FormControl):{[key:string]:any} {
    const val = c.value.identityNo
    if(val.length != 9){
      return {
        IdInvlid:true
      };
    } ;
    const regPassport = /^[a-zA-Z]{5,17}$/;
    regPassport.test(val) ? null : {
      isNoValid:true
    }
  }
  validateMilitary(c:FormControl):{[key:string]:any} {
    const val = c.value.identityNo
    if(!val){
      return null ;
    }
    const regMilitary = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    regMilitary.test(val) ? null : {
        isNoValid:true
      }
  }
 
}
