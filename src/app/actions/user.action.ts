import { Action } from '@ngrx/store';
import { type } from '../utils/quote-action.util';
import { User, Project } from '../domain';

export declare interface UserProject{
    user:User;
    projectId:string
}

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const userActionTypes = {
    ADD : type('[User] adding user project'),
    ADD_SUCCESS : type('[User] adding user project success'),
    ADD_FAILED : type('[User] adding user project failed'), 
    UPDATE: type('[User] updating user project'),
    UPDATE_SUCCESS : type('[User] update user project success'),
    UPDATE_FAILED : type('[User] update user project failed'), 
    DELETE: type('[User] deleting user project'),
    DELETE_SUCCESS : type('[User] delete user project success'),
    DELETE_FAILED : type('[User] delete user project failed'), 
    SEARCH: type('[User] searching user by project'),
    SEARCH_SUCCESS : type('[User] search user by project success'),
    SEARCH_FAILED : type('[User] search user by project failed'), 
    SEARCH_USER: type('[User] search user'),
    SEARCH_USER_SUCCESS : type('[User] search user success'),
    SEARCH_USER_FAILED : type('[User] search user failed'), 
    
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 增
export class AddAction implements Action {
    readonly type = userActionTypes.ADD;

    constructor(public payload: UserProject) { }
}

export class AddSuccessAction implements Action {
    readonly type = userActionTypes.ADD_SUCCESS;

    constructor(public payload: User) { }
}

export class AddFailedAction implements Action {
    readonly type = userActionTypes.ADD_FAILED;

    constructor(public payload: string) { }
}
//改
export class UpdateAction implements Action {
    readonly type = userActionTypes.UPDATE;

    constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = userActionTypes.UPDATE_SUCCESS;

    constructor(public payload: User[]) { }
}

export class UpdateFailedAction implements Action {
    readonly type = userActionTypes.UPDATE_FAILED;

    constructor(public payload: string) { }
}
//删
export class DeleteAction implements Action {
    readonly type = userActionTypes.DELETE;

    constructor(public payload: UserProject) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = userActionTypes.DELETE_SUCCESS;

    constructor(public payload: User) { }
}

export class DeleteFailedAction implements Action {
    readonly type = userActionTypes.DELETE_FAILED;

    constructor(public payload: string) { }
}
//查
export class SearchAction implements Action {
    readonly type = userActionTypes.SEARCH;

    constructor(public payload:string) { }
}

export class SearchSuccessAction implements Action {
    readonly type = userActionTypes.SEARCH_SUCCESS;

    constructor(public payload: User[]) { }
}

export class SearchFailedAction implements Action {
    readonly type = userActionTypes.SEARCH_FAILED;

    constructor(public payload: string) { }
}

export class SearchUserAction implements Action {
    readonly type = userActionTypes.SEARCH_USER;

    constructor(public payload: {taskId:string,taskListId:string}) { }
}

export class SearchUserSuccessAction implements Action {
    readonly type = userActionTypes.SEARCH_USER_SUCCESS;

    constructor(public payload: User[]) { }
}

export class SearchUserFailedAction implements Action {
    readonly type = userActionTypes.SEARCH_USER_FAILED;

    constructor(public payload: string) { }
}







/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UserActions
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
                        | SearchFailedAction;
