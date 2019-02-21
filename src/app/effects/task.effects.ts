import { Injectable } from '@angular/core';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as projectGeneric from '../actions/project.action';
import * as taskGeneric from '../actions/task.action';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { debug } from 'util';
import { go } from '@ngrx/router-store';
import { TaskService } from '../service/task.service';


@Injectable()
export class TaskEffects {

    constructor(private service$:TaskService,private actions:Actions,private store$:Store<fromRoot.State>){

    }

    @Effect() 
    taskList$ = this.actions.ofType(taskGeneric.taskActionTypes.SEARCH)
        .map(toPayload)
        .mergeMap((taskLists)=>{
            return this.service$.getByLists(taskLists)
            .map((tasks)=> new taskGeneric.SearchSuccessAction(tasks))
            .catch((err)=>Observable.of(new taskGeneric.SearchFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    addTask$ = this.actions.ofType(taskGeneric.taskActionTypes.ADD)
        .map(toPayload)
        .mergeMap((task)=>{
            return this.service$.add(task)
            .map((tk)=> new taskGeneric.AddSuccessAction(tk))
            .catch((err)=>Observable.of(new taskGeneric.AddFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    updateTask$ = this.actions.ofType(taskGeneric.taskActionTypes.UPDATE)
        .map(toPayload)
        .mergeMap((task)=>{
            return this.service$.update(task)
            .map((tk)=> new taskGeneric.UpdateSuccessAction(tk))
            .catch((err)=>Observable.of(new taskGeneric.UpdateFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    deleteTask$ = this.actions.ofType(taskGeneric.taskActionTypes.DELETE)
        .map(toPayload)
        .mergeMap((task)=>{
            return this.service$.delete(task)
            .map((tk)=> new taskGeneric.DeleteSuccessAction(tk))
            .catch((err)=>Observable.of(new taskGeneric.DeleteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    commplete$ = this.actions.ofType(taskGeneric.taskActionTypes.COMPLETE)
        .map(toPayload)
        .mergeMap((task)=>{
            return this.service$.complete(task)
            .map((tk)=> new taskGeneric.CompleteSuccessAction(tk))
            .catch((err)=>Observable.of(new taskGeneric.CompleteFailedAction(JSON.stringify(err))))
        }
    )

    @Effect()
    move$ = this.actions.ofType(taskGeneric.taskActionTypes.MOVE)
        .map(toPayload)
        .switchMap(({taskId,taskListId})=> this.service$.move(taskId,taskListId)
            .map((tsk)=>new taskGeneric.MoveSuccessAction(tsk))
            .catch((err)=>Observable.of(new taskGeneric.MoveFailedAction(JSON.stringify(err))))
        )

    @Effect()
    moveAll$ = this.actions.ofType(taskGeneric.taskActionTypes.MOVE_ALL)
        .map(toPayload)
        .switchMap(({srcListId,targetListId})=> this.service$.moveAll(srcListId,targetListId)
            .map((tsks)=>new taskGeneric.MoveAllSuccessAction(tsks))
            .catch((err)=>Observable.of(new taskGeneric.MoveAllFailedAction(JSON.stringify(err))))
        )
    
 
  

}