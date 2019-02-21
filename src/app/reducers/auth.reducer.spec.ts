import {reducer} from './auth.reducer';
import * as fromAuth from './auth.reducer';
import * as genericAuth from '../actions/auth.action';
import { async } from '@angular/core/testing';


describe("测试 AuthReducer",()=>{
  describe('测试未定义Auction', () => {
    it('应该返回一个默认值', async(() => {
      const action = {} as any;
      const result = reducer(undefined,action);
        expect(result).toEqual(fromAuth.initialState)
      }
    ));
  });

  describe('登陆成功', () => {
    it('返回一个 err 为undefined userId 不为空的 Auth对象', async(() => {
      const action = {
        type:genericAuth.AuthActionTypes.LOGIN_SUCCESS,
        payload:{
          token:"",
          user:{
            id:'',
            email:"dec@local.dev"
          }
        }
      } as any ;
      const result = reducer(undefined,action);
      expect(result.user).toEqual(action.payload.user);
      expect(result.err).toBeUndefined()
    }));
  });

})
