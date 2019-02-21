import { Action } from '@ngrx/store';
//Auth
import { Auth } from '../domain/auth.model';
//type
import { type } from '../utils/quote-action.util';
import { User } from '../domain';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export const AuthActionTypes = {
    // 登陆时的状态
    LOGIN : type('[Auth] Log is running!'),
    LOGIN_SUCCESS : type('[Auth] Login Success!'),
    LOGIN_FAILED : type('[Auth] Login Failed!'),

    // 注册时的状态
    REGISTER : type('[Auth] Register is running!'),
    REGISTER_SUCCESS : type('[Auth] Register Success!'),
    REGISTER_FAILED : type('[Auth] Register Failed!'),

    //退出
    LOG_OUT : type('[Auth] Log Out!')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */

 //登录时的action状态
export class LogAction implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: {email:string,password:string}) { }
}

export class LogSuccessAction implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;

    constructor(public payload: Auth) { }
}
export class LogFailedAction implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILED;

    constructor(public payload: string) { }
}

//注册时的action装填

export class RegisterAction implements Action {
    readonly type = AuthActionTypes.REGISTER;

    constructor(public payload: User) { }
}
export class RegisterSuccessAction implements Action {
    readonly type = AuthActionTypes.REGISTER_SUCCESS;

    constructor(public payload: Auth) { }
}

export class RegisterFailedAction implements Action {
    readonly type = AuthActionTypes.REGISTER_FAILED;

    constructor(public payload: string) { }
}

//退出时的action状态
export class LogoutAction implements Action {
    readonly type = AuthActionTypes.LOG_OUT;

    constructor(public payload: null) { }
}



/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AuthActions
                        = LogAction
                        | LogSuccessAction
                        | LogFailedAction
                        | RegisterAction
                        | RegisterSuccessAction
                        | RegisterFailedAction
                        | LogoutAction;
