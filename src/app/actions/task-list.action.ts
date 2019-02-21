import { Action } from '@ngrx/store';
import { type } from '../utils/quote-action.util';
import { User, TaskList } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const taskListActionTypes = {
    ADD : type('[TaskList] adding'),
    ADD_SUCCESS : type('[TaskList] adding success'),
    ADD_FAILED : type('[TaskList] adding failed'), 
    UPDATE: type('[TaskList] updating'),
    UPDATE_SUCCESS : type('[TaskList] update success'),
    UPDATE_FAILED : type('[TaskList] update failed'), 
    DELETE: type('[TaskList] deleting'),
    DELETE_SUCCESS : type('[TaskList] delete success'),
    DELETE_FAILED : type('[TaskList] delete failed'), 
    SEARCH: type('[TaskList] searching'),
    SEARCH_SUCCESS : type('[TaskList] search success'),
    SEARCH_FAILED : type('[TaskList] search failed'), 
    SWAP: type('[TaskList] swaping'),
    SWAP_SUCCESS : type('[TaskList] swap success'),
    SWAP_FAILED : type('[TaskList] swap failed'), 
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 增
export class AddAction implements Action {
    readonly type = taskListActionTypes.ADD;

    constructor(public payload: string) { }
}

export class AddSuccessAction implements Action {
    readonly type = taskListActionTypes.ADD_SUCCESS;

    constructor(public payload: TaskList) { }
}

export class AddFailedAction implements Action {
    readonly type = taskListActionTypes.ADD_FAILED;

    constructor(public payload: string) { }
}
//改
export class UpdateAction implements Action {
    readonly type = taskListActionTypes.UPDATE;

    constructor(public payload: TaskList) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = taskListActionTypes.UPDATE_SUCCESS;

    constructor(public payload: TaskList) { }
}

export class UpdateFailedAction implements Action {
    readonly type = taskListActionTypes.UPDATE_FAILED;

    constructor(public payload: string) { }
}
//删
export class DeleteAction implements Action {
    readonly type = taskListActionTypes.DELETE;

    constructor(public payload: TaskList) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = taskListActionTypes.DELETE_SUCCESS;

    constructor(public payload: TaskList) { }
}

export class DeleteFailedAction implements Action {
    readonly type = taskListActionTypes.DELETE_FAILED;

    constructor(public payload: string) { }
}
//查
export class SearchAction implements Action {
    readonly type = taskListActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchSuccessAction implements Action {
    readonly type = taskListActionTypes.SEARCH_SUCCESS;

    constructor(public payload: TaskList[]) { }
}

export class SearchFailedAction implements Action {
    readonly type = taskListActionTypes.SEARCH_FAILED;

    constructor(public payload: string) { }
}
//邀请组员
export class SwapAction implements Action {
    readonly type = taskListActionTypes.SWAP;

    constructor(public payload: {src:TaskList,target:TaskList}) { }
}

export class SwapSuccessAction implements Action {
    readonly type = taskListActionTypes.SWAP_SUCCESS;

    constructor(public payload: TaskList[]) { }
}

export class SwapFailedAction implements Action {
    readonly type = taskListActionTypes.SWAP_FAILED;

    constructor(public payload: string) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TaskListActions
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
                        | SwapAction
                        | SwapSuccessAction
                        | SwapFailedAction;
