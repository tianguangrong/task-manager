import { Action } from '@ngrx/store';
import { type } from '../utils/quote-action.util';
import { Project, User } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const projectActionTypes = {
    ADD : type('[Project] adding'),
    ADD_SUCCESS : type('[Project] adding success'),
    ADD_FAILED : type('[Project] adding failed'), 
    UPDATE: type('[Project] updating'),
    UPDATE_SUCCESS : type('[Project] update success'),
    UPDATE_FAILED : type('[Project] update failed'), 
    DELETE: type('[Project] deleting'),
    DELETE_SUCCESS : type('[Project] delete success'),
    DELETE_FAILED : type('[Project] delete failed'), 
    SEARCH: type('[Project] searching'),
    SEARCH_SUCCESS : type('[Project] search success'),
    SEARCH_FAILED : type('[Project] search failed'), 
    INVITE: type('[Project] inviting'),
    INVITE_SUCCESS : type('[Project] invite success'),
    INVITE_FAILED : type('[Project] invite failed'), 
    SELECT_PROJECT : type('[Project] select Project'), 
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
// 增
export class AddAction implements Action {
    readonly type = projectActionTypes.ADD;

    constructor(public payload: null) { }
}

export class AddSuccessAction implements Action {
    readonly type = projectActionTypes.ADD_SUCCESS;

    constructor(public payload: Project) { }
}

export class AddFailedAction implements Action {
    readonly type = projectActionTypes.ADD_FAILED;

    constructor(public payload: string) { }
}
//改
export class UpdateAction implements Action {
    readonly type = projectActionTypes.UPDATE;

    constructor(public payload: Project) { }
}

export class UpdateSuccessAction implements Action {
    readonly type = projectActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Project) { }
}

export class UpdateFailedAction implements Action {
    readonly type = projectActionTypes.UPDATE_FAILED;

    constructor(public payload: string) { }
}
//删
export class DeleteAction implements Action {
    readonly type = projectActionTypes.DELETE;

    constructor(public payload: Project) { }
}

export class DeleteSuccessAction implements Action {
    readonly type = projectActionTypes.DELETE_SUCCESS;

    constructor(public payload: Project) { }
}

export class DeleteFailedAction implements Action {
    readonly type = projectActionTypes.DELETE_FAILED;

    constructor(public payload: string) { }
}
//查
export class SearchAction implements Action {
    readonly type = projectActionTypes.SEARCH;

    constructor(public payload: string) { }
}

export class SearchSuccessAction implements Action {
    readonly type = projectActionTypes.SEARCH_SUCCESS;

    constructor(public payload: Project[]) { }
}

export class SearchFailedAction implements Action {
    readonly type = projectActionTypes.SEARCH_FAILED;

    constructor(public payload: string) { }
}
//邀请组员
export class InviteAction implements Action {
    readonly type = projectActionTypes.INVITE;

    constructor(public payload: {projectId:string,members:User[]}) { }
}

export class InviteSuccessAction implements Action {
    readonly type = projectActionTypes.INVITE_SUCCESS;

    constructor(public payload: Project) { }
}

export class InviteFailedAction implements Action {
    readonly type = projectActionTypes.INVITE_FAILED;

    constructor(public payload: string) { }
}
export class SelectProjectAction implements Action {
    readonly type = projectActionTypes.SELECT_PROJECT;

    constructor(public payload: Project) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProjectActions
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
                        | SelectProjectAction
                        | InviteAction
                        | InviteSuccessAction
                        | InviteFailedAction;
