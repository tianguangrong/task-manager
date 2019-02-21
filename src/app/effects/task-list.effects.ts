import { Injectable } from '@angular/core';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as projectGeneric from '../actions/project.action';
import * as taskListGeneric from '../actions/task-list.action';
import * as taskGeneric from '../actions/task.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { debug } from 'util';
import { go } from '@ngrx/router-store';
import { TaskListService } from '../service/task-list.service';


@Injectable()
export class TaskListEffects {

    constructor(private service$:TaskListService,private actions:Actions,private store$:Store<fromRoot.State>){

    }

    @Effect() 
    taskList$ = this.actions.ofType(taskListGeneric.taskListActionTypes.SEARCH)
        .map(toPayload)
        .mergeMap((projectId)=>{
            return this.service$.get(projectId)
            .map((taskLists)=> new taskListGeneric.SearchSuccessAction(taskLists))
            .catch((err)=>Observable.of(new taskListGeneric.SearchFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    addTaskList$ = this.actions.ofType(taskListGeneric.taskListActionTypes.ADD)
        .map(toPayload)
        .mergeMap((tasklist)=>{
            return this.service$.add(tasklist)
            .map((tl)=> new taskListGeneric.AddSuccessAction(tl))
            .catch((err)=>Observable.of(new taskListGeneric.AddFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    updateTaskList$ = this.actions.ofType(taskListGeneric.taskListActionTypes.UPDATE)
        .map(toPayload)
        .mergeMap((taskList)=>{
            return this.service$.update(taskList)
            .map((tl)=> new taskListGeneric.UpdateSuccessAction(tl))
            .catch((err)=>Observable.of(new taskListGeneric.UpdateFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    deleteTaskList$ = this.actions.ofType(taskListGeneric.taskListActionTypes.DELETE)
        .map(toPayload)
        .mergeMap((taskList)=>{
            return this.service$.delete(taskList)
            .map((tl)=> new taskListGeneric.DeleteSuccessAction(tl))
            .catch((err)=>Observable.of(new taskListGeneric.DeleteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    swap$ = this.actions.ofType(taskListGeneric.taskListActionTypes.SWAP)
        .map(toPayload)
        .switchMap(({src,target})=> this.service$.swapOrder(src,target)
            .map((tsks)=>new taskListGeneric.SwapSuccessAction(tsks))
            .catch((err)=>Observable.of(new taskListGeneric.SwapFailedAction(JSON.stringify(err))))
        )

    @Effect()
    loadTask$ = this.actions.ofType(taskListGeneric.taskListActionTypes.SEARCH_SUCCESS)
        .map(toPayload)
        .map(lists => new taskGeneric.SearchAction(lists))
        
    
 
  

}