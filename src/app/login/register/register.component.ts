import { Component, OnInit, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Identity } from '../../domain';
import { isValidDate } from '../../utils/date.util';
import { extractInfo, isValidAddr, getAddrByCode } from '../../utils/identity.util';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as registerGeneric from '../../actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  avatars:any;
  form:FormGroup;
  sub:Subscription;

  constructor(private fb: FormBuilder,private store$:Store<fromRoot.State>) { }

  ngOnInit() {
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    this.avatars = nums.map(d=>`avatars:svg-${d}`)
    
    this.form = this.fb.group({
      email:[""],
      password:[""],
      repassword:[""],
      avatar:["avatars:svg-1"],
      dateOfBirth:["1990-01-01"],
      address:[""],
      identity:[""]
    });
    //身份证信息与age /address的联动
    const id$ = this.form.get("identity").valueChanges
      .debounceTime(400)
      .filter((_:any)=>{
        return this.form.get("identity").valid;
      });

      this.sub = id$.subscribe((id:Identity)=>{
        const info = extractInfo(id.identityNo);
        
        if(isValidAddr(info.addrCode)){
          //设置地址部分
          const addr = getAddrByCode(info.addrCode);
          this.form.get("address").patchValue(addr)
        }
        if(isValidDate(info.dateOfBirth)){
          //设置时间部分
          this.form.get("dateOfBirth").patchValue(info.dateOfBirth)
        }
      })
  }
  
  onSubmit({value,valid},ev:Event){
   ev.defaultPrevented;
   if(!valid){
     return
   }
   this.store$.dispatch(new registerGeneric.RegisterAction(value));
  }
  //销毁流
  ngOnDestroy(): void{
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
