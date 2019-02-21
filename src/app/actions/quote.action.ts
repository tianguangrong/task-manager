//aciton
import { Action } from '@ngrx/store';
// quote 泛型
import { Quote } from '../domain';
//type校验字符串的方法
import { type } from '../utils/quote-action.util';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
//定义action的type
export  const quoteActionTypes = {
    LOAD :type('[Quote] loading !'),
    LOAD_SUCCESS : type('[Quote] load success !'),
    LOAD_FAILED : type('[Quote] load failed !'),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 */
//将每个type分别引入添加Action以来的 类中,来显示不同的状态;
export class quoteAction implements Action {
    readonly type = quoteActionTypes.LOAD;

    constructor(public payload: any) { }
}

export class quoteSuccessAction implements Action {
    readonly type = quoteActionTypes.LOAD_SUCCESS;

    constructor(public payload: Quote) { }
}
export class quoteFailedAction implements Action {
    readonly type = quoteActionTypes.LOAD_FAILED;

    constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
//集体导出
export type quoteActions
                        = quoteAction
                        | quoteSuccessAction
                        | quoteFailedAction;
