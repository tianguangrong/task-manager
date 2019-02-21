import { Action } from '@ngrx/store';
import { type } from '../utils/quote-action.util';
import { User, Task, TaskList } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const taskActionTypes = {
    ADD : type('[Task] adding'),
    ADD_SUCCESS : type('[Task] adding success'),
    ADD_FAILED : type('[Task] adding failed'), 
    UPDATE: type('[Task] updating'),
    UPDATE_SUCCESS : type('[Task] update success'),
    UPDATE_FAILED : type('[Task] update failed'), 
    DELETE: type('[Task] deleting'),
    DELETE_SUCCESS : type('[Task] delete success'),
    DELETE_FAILED : type('[Task] delete failed'), 
    SEARCH: type('[Task] searching'),
    SEARCH_SUCCESS : type('[Task] search success'),
    SEARCH_FAILED : type('[Task] search failed'), 
    MOVE: type('[Task] moving'),
    MOVE_SUCCESS : type('[Task] move success'),
    MOVE_FAILED : type('[Task] move failed'), 
    MOVE_ALL: type('[Task] moving all'),
    MOVE_ALL_SUCCESS : type('[Task] move all success'),
    MOVE_ALL_FAILED : type('[Task] move all failed'), 
    COMPLETE: type('[Task] completing'),
    COMPLETE_SUCCESS : type('[Task] complete success'),
    COMPLETE_FAILED : type('[Task] complete failed'), 
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 增
export class AddAction implements Action {
    readonly type = taskActionTypes.ADD;

    constructor(public payload: Task) { }
}

export class AddSuccessAction implements Action {
    readonly type = taskActionTypes.ADD_SUCCESS;

    constructor(public payload: Task) { }
}

export class AddFailedAction implements Action {
    readonly type = taskActionTypes.ADD_FAILED;

    constructor(public payload: string) { }
}
//改
export class UpdateAction implements Action {
    readonly type = taskActionTypes.UPDATE;

    constructor(public payload: Task) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = taskActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Task) { }
}

export class UpdateFailedAction implements Action {
    readonly type = taskActionTypes.UPDATE_FAILED;

    constructor(public payload: string) { }
}
//删
export class DeleteAction implements Action {
    readonly type = taskActionTypes.DELETE;

    constructor(public payload: Task) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = taskActionTypes.DELETE_SUCCESS;

    constructor(public payload: Task) { }
}

export class DeleteFailedAction implements Action {
    readonly type = taskActionTypes.DELETE_FAILED;

    constructor(public payload: string) { }
}
//查
export class SearchAction implements Action {
    readonly type = taskActionTypes.SEARCH;

    constructor(public payload: TaskList[]) { }
}

export class SearchSuccessAction implements Action {
    readonly type = taskActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Task[]) { }
}

export class SearchFailedAction implements Action {
    readonly type = taskActionTypes.SEARCH_FAILED;

    constructor(public payload: string) { }
}

export class MoveAction implements Action {
    readonly type = taskActionTypes.MOVE;

    constructor(public payload: {taskId:string,taskListId:string}) { }
}

export class MoveSuccessAction implements Action {
    readonly type = taskActionTypes.MOVE_SUCCESS;

    constructor(public payload: Task) { }
}

export class MoveFailedAction implements Action {
    readonly type = taskActionTypes.MOVE_FAILED;

    constructor(public payload: string) { }
}

export class MoveAllAction implements Action {
    readonly type = taskActionTypes.MOVE_ALL;

    constructor(public payload: {srcListId:string,targetListId:string}) { }
}

export class MoveAllSuccessAction implements Action {
    readonly type = taskActionTypes.MOVE_ALL_SUCCESS;

    constructor(public payload: Task[]) { }
}

export class MoveAllFailedAction implements Action {
    readonly type = taskActionTypes.MOVE_ALL_FAILED;

    constructor(public payload: string) { }
}

export class CompleteAction implements Action {
    readonly type = taskActionTypes.COMPLETE;

    constructor(public payload: Task) { }
}

export class CompleteSuccessAction implements Action {
    readonly type = taskActionTypes.COMPLETE_SUCCESS;

    constructor(public payload: Task) { }
}

export class CompleteFailedAction implements Action {
    readonly type = taskActionTypes.COMPLETE_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TaskActions
                        = AddAction
                        | AddSuccessAction
                        | AddFailedAction
                        | UpdateAction
                        | UpdateSuccessAction
                        | UpdateFailedAction
                        | DeleteAction
                        | DeleteSuccessAction
                        | DeleteFailedAction
                        | SearchAction
                        | SearchSuccessAction
                        | SearchFailedAction
                        | MoveAction
                        | MoveSuccessAction
                        | MoveFailedAction
                        | MoveAllAction
                        | MoveAllSuccessAction
                        | MoveAllFailedAction
                        | CompleteAction
                        | CompleteSuccessAction
                        | CompleteFailedAction;
