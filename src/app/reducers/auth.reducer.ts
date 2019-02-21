import * as genericAuth from '../actions/auth.action';
import { Auth } from '../domain';


export const initialState: Auth = {   
    token:""
 };

export function reducer(state = initialState, action: genericAuth.AuthActions ): Auth {
    switch (action.type) {
        //当登陆和注册成功直接
        case genericAuth.AuthActionTypes.LOGIN_SUCCESS: 
        case genericAuth.AuthActionTypes.REGISTER_SUCCESS:{
            //返回一个Auth类型的数据
            return {...<Auth>action.payload}
        }
        //如果登陆和注册失败
        case genericAuth.AuthActionTypes.LOGIN_FAILED: 
        case genericAuth.AuthActionTypes.REGISTER_FAILED:{
            //返回一个空的对象
            return initialState
        }

        default: {
            //返回原有的state
            return state;
        }
    }
}
