import { Injectable } from '@angular/core';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as projectGeneric from '../actions/project.action';
import * as userGeneric from '../actions/user.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { debug } from 'util';
import { go } from '@ngrx/router-store';
import { UserService } from '../service/user.service';
import { User } from '../domain';


@Injectable()
export class UserEffects {

    constructor(private service$:UserService,private actions:Actions,private store$:Store<fromRoot.State>){

    }

    @Effect() 
    loadUsers$ = this.actions.ofType(userGeneric.userActionTypes.SEARCH)
        .map(toPayload)
        .mergeMap((projectId)=>{
            return this.service$.getUsersByProject(projectId)
            .map((Users)=> new userGeneric.SearchSuccessAction(Users))
            .catch((err)=>Observable.of(new userGeneric.SearchFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    addUserProjectRef$ = this.actions.ofType(userGeneric.userActionTypes.ADD)
        .map(toPayload)
        .mergeMap(({user,projectId})=>{
            return this.service$.addProjectRef(user,projectId)
            .map((u)=> new userGeneric.AddSuccessAction(u))
            .catch((err)=>Observable.of(new userGeneric.AddFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    updateUserProjectRef$ = this.actions.ofType(userGeneric.userActionTypes.UPDATE)
        .map(toPayload)
        .mergeMap((project)=>{
            return this.service$.batchUpdateProjectRef(project)
            .map((users)=> new userGeneric.UpdateSuccessAction(users))
            .catch((err)=>Observable.of(new userGeneric.UpdateFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    delUserProjectRef$ = this.actions.ofType(userGeneric.userActionTypes.DELETE)
        .map(toPayload)
        .mergeMap(({user,projectId})=>{
            return this.service$.removeProjectRef(user,projectId)
            .map((u)=> new userGeneric.DeleteSuccessAction(u))
            .catch((err)=>Observable.of(new userGeneric.DeleteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    searchUser$ = this.actions.ofType(userGeneric.userActionTypes.SEARCH_USER)
        .map(toPayload)
        .switchMap((str)=> this.service$.searchUser(str)
            .map((users:User[])=>new userGeneric.SearchUserSuccessAction(users))
            .catch((err)=>Observable.of(new userGeneric.SearchUserFailedAction(JSON.stringify(err))))
        )
    
 
  

}