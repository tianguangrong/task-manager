import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as genericAuth from '../actions/auth.action';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';
import { User, Auth } from '../domain';

@Injectable()
export class AuthEffects {
    constructor(public actions:Actions,private service$:AuthService){}
    @Effect()
    login$ = this.actions
        .ofType(genericAuth.AuthActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(({email,password})=> this.service$.login(email,password)
            .map((auth)=>{
                return new genericAuth.LogSuccessAction(auth)
            })
            .catch((err)=> Observable.of(new genericAuth.LogFailedAction(JSON.stringify(err))))
    );

    @Effect()
    register$ = this.actions
        .ofType(genericAuth.AuthActionTypes.REGISTER)
        .map(toPayload)
        .switchMap((user:User)=>this.service$.register(user)
            .map((auth:Auth)=>new genericAuth.RegisterSuccessAction(auth))
            .catch((err)=>Observable.of(new genericAuth.RegisterFailedAction(JSON.stringify(err))))
    );

    @Effect()
    logOut$ = this.actions
        .ofType(genericAuth.AuthActionTypes.LOG_OUT)
        .map((_:any)=>go(['/']))
    
    @Effect()
    logOu$ = this.actions
        .ofType(genericAuth.AuthActionTypes.LOG_OUT)
        .map((_:any)=> new genericAuth.LogFailedAction("已退出登陆"))
    
    @Effect()
    loginCompleted = this.actions
        .ofType(genericAuth.AuthActionTypes.LOGIN_SUCCESS)
        .map((_:any)=>go(['/project']));

    @Effect()
    registerCompleted = this.actions
        .ofType(genericAuth.AuthActionTypes.REGISTER_SUCCESS)
        .map((_:any)=>go(['/project']))
      
}