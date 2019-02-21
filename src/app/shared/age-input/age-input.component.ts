import { Component, OnInit, forwardRef, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { isValidDate } from '../../utils/date.util';
import { Subscription } from 'rxjs/Subscription';
import {ControlValueAccessor, NG_VALIDATORS, FormControl, FormGroup, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { 
  isBefore, 
  subDays, 
  subHours, 
  subMonths, 
  differenceInDays, 
  differenceInHours, 
  differenceInMonths, 
  differenceInYears, 
  parse, 
  format,
  subYears,
  isValid,
  isDate,
  isFuture
} from 'date-fns';


//定义年龄类
export interface Age {
  ageNum:number;
  ageUnit:AgeUnit;
}
//枚举类型
export enum AgeUnit{
  Year = 0,
  Month,
  Day
}

@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>AgeInputComponent),
      multi:true
    },{
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>AgeInputComponent),
      multi:true
    }
  ]
})
export class AgeInputComponent implements OnInit, ControlValueAccessor,OnDestroy {

  @Input() daysTop = 90 ;
  @Input() daysBottom = 0 ;
  @Input() monthsTop = 24 ;
  @Input() monthsBottom = 1 ;
  @Input() yearsTop = 150 ;
  @Input() yearsBottom = 1 ;
  @Input() format = 'YYYY-MM-DD' ;
  

  selectedUnit = AgeUnit.Year
  ageUnits = [
    {value:AgeUnit.Year,label:'岁'},
    {value:AgeUnit.Month,label:'月'},
    {value:AgeUnit.Day,label:'日'}
  ]
  sub:Subscription;

  private propagationChange = (_:any) => {};

  form:FormGroup;

  constructor(private fb:FormBuilder) { };

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }


  ngOnInit() {
    this.form = this.fb.group({
      birthday:["",this.validateDate],
      age:this.fb.group({
        ageNum:[""],
        ageUnit:[AgeUnit.Year]
      },{validator:this.validateAge('ageNum','ageUnit')})
    });
    //拿到form表单里面input输出的值。
    const birthday = this.form.get("birthday");
    const ageUnit = this.form.get("age").get("ageUnit");
    const ageNum= this.form.get("age").get("ageNum");
    const ageNum$= ageNum.valueChanges.startWith(ageNum.value).debounceTime(500).distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges.startWith(ageUnit.value).distinctUntilChanged();
    //给时间添加标记
    const birthday$ = birthday.valueChanges.map((d)=>{
      return {
        date:d,
        from:"birthday"
      }
    })
    .filter((_:any) => birthday.valid)
    .debounceTime(500).distinctUntilChanged();
    //给年龄添加标记
    const age$ = Observable.combineLatest(ageNum$,ageUnit$,(num,unit) => {
      return this.toDate({ageNum:num,ageUnit:unit})
    }).map((d)=>{
      return {
        date:d,
        from:"age"
      }
    })
    .filter((_:any)=>this.form.get("age").valid);
    //将从生日过来的流和从年龄过来的流合并成一个流；
    const merged$ = Observable.merge(birthday$,age$).filter((_:any)=>this.form.valid)
    
    //订阅这个混合流：
    this.sub = merged$.subscribe((dateMes)=>{
      // 它流里面输出的内容是   {
      //                         date:2011/11/22,
      //                         from:birthday/age
      //                       }
      
      //通过这个this.toAge方法将日期转化成为年龄 
      const age = this.toAge(dateMes.date);
      console.log('age>>>>>   '+JSON.stringify(age));
      //转化后的格式是          {
      //                         ageNum:21,                        
      //                         ageUnit:年/月/日
      //                       }

      //判断这个年龄是从哪个输入框中出来，并分别进行操作
      if(dateMes.from === "birthday"){
        //从birthday里面发出来的年龄
        if(age.ageNum !== ageNum.value){
          console.log("age.ageNum :"+age.ageNum);
          console.log("ageNum.value :"+ageNum.value);
          //如果你流里面是年龄和你age输入框中的年龄不一致
          ageNum.patchValue(age.ageNum,{emitEvent:false});
        };
        if(age.ageUnit !== ageUnit.value){
          this.selectedUnit = age.ageUnit;
          //如果你流里面的年龄单位和你age输入框旁边的年龄单位不一致
          ageUnit.patchValue(age.ageUnit,{emitEvent:false});
        };
        //将你的改变通知给form表单
        this.propagationChange(dateMes.date);
      }else{
        //从age输入框里面发出来的年龄
        const compareAge = this.toAge(birthday.value);
        if(compareAge.ageNum !== age.ageNum || compareAge.ageUnit !== age.ageUnit){
          this.form.get('birthday').patchValue(dateMes.date);
          //将你的改变通知给form表单
        this.propagationChange(dateMes.date);
        };

      }
    })


  }

  writeValue(obj: any): void{
    //将空间的初始值设置到我们自定义空间的输入框中
    if(obj){
      const date = format(obj,'YYYY-MM-DD');
      const age = this.toAge(obj);
      this.form.get("birthday").patchValue(date);
      this.form.get("age").get("ageNum").patchValue(age.ageNum);
      this.form.get("age").get("ageUnit").patchValue(age.ageUnit)
      
    }
  }

  registerOnChange(fn: any): void{
    this.propagationChange = fn;
  }

  registerOnTouched(fn: any): void{

  }

  toDate(age:Age):string{
    const now = Date.now();
    const dateFormat = this.format;
    switch (age.ageUnit) {
      case AgeUnit.Year:
        return format(subYears(now,age.ageNum),dateFormat);
      case AgeUnit.Month:
        return format(subMonths(now,age.ageNum),dateFormat);
      case AgeUnit.Day:
        return format(subDays(now,age.ageNum),dateFormat);
      default:
        return null;    }
  }
  toAge(dateStr:string):Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now,this.daysTop),date) ? {ageNum:differenceInDays(now,date),ageUnit:AgeUnit.Day}:
           isBefore(subMonths(now,this.monthsTop),date) ? {ageNum:differenceInMonths(now,date),ageUnit:AgeUnit.Month}:
           {ageNum:differenceInYears(now,date),ageUnit:AgeUnit.Year};

  }

  //校验器

  validate(c:FormControl):{[key:string]:any}{
    const val = c.value;
    if(!val){
      return null;
    }
    if(isValidDate(val)){
      return null;
    }
    return{
      dataOfBirthInvalid:true
    }
  }

  validateDate(c:FormControl):{[key:string]:any}{
    const val = c.value;
    return isValidDate(val)?null:{
        dateInvalid:true
      }
  }

  validateAge(age:string,unit:string) {
    return (group:FormGroup):{[key:string]:any} => {
      const numKey = group.controls[age];
      const unitKey = group.controls[unit];
      let result = false;
      const numKeyValue = numKey.value;
      switch (unitKey.value) {
        case AgeUnit.Year:
          result = numKeyValue >= this.yearsBottom && numKeyValue <= this.yearsTop ;
          break;
        case AgeUnit.Month:
          result = numKeyValue >= this.monthsBottom && numKeyValue <= this.monthsTop;
          break;
        case AgeUnit.Day:
          result = numKeyValue >= this.daysBottom && numKeyValue <= this.daysTop ;
          break;
        default:
          break;
      }
      
      return result ? null : {ageInvalid:true}
    }
  }

}
