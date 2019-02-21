import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators, Validator } from '@angular/forms';
import { QuoteService } from '../../service/quote.service';
import { Quote } from '../../domain/quote.model';
import { State, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import * as  ActionGeneric from '../../actions/quote.action';
import * as AuthGeneric from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  quote$:Observable<Quote>;

  constructor(
    private fb:FormBuilder,
    private quoteService:QuoteService,
    private store$:Store<fromRoot.State>
  
  ) { }

  ngOnInit() {
  this.form = this.fb.group({
      email:["",Validators.compose([Validators.email,this.validator])],
      password:["",Validators.required]
    })
    
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new ActionGeneric.quoteAction(null));

  }
  
  onSubmit({value,valid},ev:Event){
    ev.defaultPrevented;
    if(!valid){
      return
    }
    this.store$.dispatch(new AuthGeneric.LogAction(value))
  }

  validator(c : FormControl):{[key:string]:any}{
    if(c.value){
      return null
    }
    return {
      tips:"email is ok!"
    }
  }


}
