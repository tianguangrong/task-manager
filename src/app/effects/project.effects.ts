import { Injectable } from '@angular/core';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import { ProjectService } from '../service/project.service';
import * as projectGeneric from '../actions/project.action';
import * as authGeneric from '../actions/auth.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { debug } from 'util';
import { go } from '@ngrx/router-store';
import * as taskListGeneric from "../actions/task-list.action";
import * as userGeneric from "../actions/user.action";
import { Project } from '../domain';


@Injectable()
export class ProjectEffects {

    constructor(private service$:ProjectService,private actions:Actions,private store$:Store<fromRoot.State>){

    }

    @Effect() 
    project$ = this.actions.ofType(projectGeneric.projectActionTypes.SEARCH)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState))
        .mergeMap(([_,auth])=>{
            return this.service$.get(auth.user.id)
            .map((pros)=> new projectGeneric.SearchSuccessAction(pros))
            .catch((err)=>Observable.of(new projectGeneric.SearchFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    addProject$ = this.actions.ofType(projectGeneric.projectActionTypes.ADD)
        .map(toPayload)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState))
        .mergeMap(([project,auth])=>{
            const add = {...project,members:[`${auth.user.id}`] }
            return this.service$.add(add)
            .map((pro)=> new projectGeneric.AddSuccessAction(pro))
            .catch((err)=>Observable.of(new projectGeneric.AddFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    updateProject$ = this.actions.ofType(projectGeneric.projectActionTypes.UPDATE)
        .map(toPayload)
        .mergeMap((project)=>{
            return this.service$.update(project)
            .map((pro)=> new projectGeneric.UpdateSuccessAction(pro))
            .catch((err)=>Observable.of(new projectGeneric.UpdateFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    deleteProject$ = this.actions.ofType(projectGeneric.projectActionTypes.DELETE)
        .map(toPayload)
        .mergeMap((project)=>{
            return this.service$.delete(project)
            .map((pro)=> new projectGeneric.DeleteSuccessAction(pro))
            .catch((err)=>Observable.of(new projectGeneric.DeleteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    selectProject$ = this.actions
        .ofType(projectGeneric.projectActionTypes.SELECT_PROJECT)
        .map(toPayload)
        .map((pro)=>go([`/taskLists/${pro.id}`])
    );

    @Effect()
    loadTaskList$ = this.actions
        .ofType(projectGeneric.projectActionTypes.SELECT_PROJECT)
        .map(toPayload)
        .map((pro)=> new taskListGeneric.SearchAction(pro.id)
    );

    @Effect()
    inviteProject$ = this.actions.ofType(projectGeneric.projectActionTypes.INVITE)
        .map(toPayload)
        .mergeMap(({projectId,members})=>{
            return this.service$.invite(projectId,members)
            .map((pro)=> new projectGeneric.InviteSuccessAction(pro))
            .catch((err)=>Observable.of(new projectGeneric.InviteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    loadUser$ = this.actions.ofType(projectGeneric.projectActionTypes.SEARCH_SUCCESS)
        .map(toPayload)
        .mergeMap((projects:Project[])=> Observable.from(projects.map(pro=>pro.id))
        .map((projectId)=>new userGeneric.SearchAction(projectId))
    )

    @Effect()
    addUserProject$ = this.actions.ofType(projectGeneric.projectActionTypes.SEARCH_SUCCESS)
        .map(toPayload)
        .map(pro=>pro.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth=>auth.user),(projectId,user)=>{
            return new userGeneric.AddAction({user,projectId})
        })

    @Effect()
    removeUserProject$ = this.actions.ofType(projectGeneric.projectActionTypes.DELETE_SUCCESS)
        .map(toPayload)
        .map(pro=>pro.id)
        .withLatestFrom(this.store$.select(fromRoot.getAuthState).map(auth=>auth.user),(projectId,user)=>{
            return new userGeneric.DeleteAction({user,projectId})
        })

    @Effect()
    updateUserProject$ = this.actions.ofType(projectGeneric.projectActionTypes.INVITE_SUCCESS)
        .map(toPayload)
        .map(pro=>new userGeneric.DeleteAction(pro))
    
  

}