import { Component, OnInit, forwardRef, Input, Inject, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { User } from '../../domain';
import { Observable } from 'rxjs';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers:[
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(()=>ChipsListComponent),
      multi:true
    },
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>ChipsListComponent),
      multi:true
    }
  ]
})
export class ChipsListComponent implements OnInit,ControlValueAccessor {

  constructor(private fb: FormBuilder,private service:UserService) { }

  private propagateionChange = (_:any)=>{}

  private form:FormGroup;

  @Input() multiple = true;

  @Input() placeholderText = '请输入成员email';

  @Input() label = '添加/修改成员';

  private items:User[] = [];

  memberResult$:Observable<User[]>;



  ngOnInit() {
    this.form = this.fb.group({memberSearch:['']});

    this.memberResult$ = this.form.get("memberSearch")
      .valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(v => v && v.length > 1)
      .flatMap((text)=>this.service.searchUser(text))
  }

  writeValue(obj: User[]): void {
    console.log("writeValue里面的值 : "+obj)
    if(obj && this.multiple){
      // const userEntities = obj.reduce((e,c)=>({...e,c}),{});
      // console.log("userEntities : "+JSON.stringify(userEntities))
      if(this.items){
        const remaining = this.items.filter((item)=>{
          return obj.filter((r)=>r.id != item.id)
        });
        this.items = [...remaining,...obj]
      }
    }else if(obj && !this.multiple){
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void{
    this.propagateionChange = fn;
  }

  registerOnTouched(fn: any): void{};

  validate(c:FormControl):{[key:string]:any} {
    return this.items ? null : {
      chipsInvalid:true
    }
  }

  handleMemberSelection(member:User){
    if(this.items.map(item=>item.id).indexOf(member.id) != -1){
      return;
    }
    this.items = this.multiple ? [...this.items,member] : [member];
    this.form.patchValue({memberSearch:member.name});
    this.propagateionChange(this.items);
  }

  remvoeMember(member:User){
    const ids = this.items.map((u)=>u.id);
    const i = ids.indexOf(member.id);
    if(this.multiple){
      if(this.items){
        this.items = [...this.items.slice(0,i),...this.items.slice(i+1)]
      }
    }else{
      this.items = [];
    }
    this.form.patchValue({memberSearch:''});
    this.propagateionChange(this.items)
  }

  displayUser(user:User):string{
    return user ? user.name : '';
  }

  private get displayInput(){
    return this.multiple || this.items.length == 0 ;
  }

}
