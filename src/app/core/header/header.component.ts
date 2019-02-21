import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as fromRoot  from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain';
import * as authGeneric from "../../actions/auth.action";
import { getAuthState } from '../../reducers';
import { Actions,toPayload, Effect } from '@ngrx/effects';
import * as projectGeneric from "../../actions/project.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter<void>();

  @Output() themeToggle = new EventEmitter<boolean>();

  constructor(private store$:Store<fromRoot.State>,private actions$:Actions) { 
    this.auth$ = this.store$.select(getAuthState);
  };

  auth$:Observable<Auth>

  ngOnInit() {
   
  }

  onClick(){
    this.toggle.emit();
  }

  onChange(checked:boolean){
   this.themeToggle.emit(checked)
  }

  logOut(){
    this.store$.dispatch(new authGeneric.LogoutAction(null));
  }

}
