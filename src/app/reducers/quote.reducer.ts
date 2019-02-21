//引入action的常量定义文件;
import * as quoteAction from '../actions/quote.action';
import { Quote } from '../domain';

//声明一个借口;
export interface State {
    quote:Quote
};

//初始化一个state状态;
export const initialState: State = {
    quote:{
        "cn": "被击垮通常只是暂时的，但如果你放弃的话，就会使它成为永恒。（Marilyn vos Savant）",
        "en": "Being defeated is often a temporary condition. Giving up is what makes it permanent.",
        "pic": "/assets/img/quotes/1.jpg"  
      }
};
//实现reducer方法;
export function reducer(state = initialState, action: quoteAction.quoteActions ): State {
    switch (action.type) {
        case quoteAction.quoteActionTypes.LOAD_SUCCESS: {
            return {...state,quote:<Quote>action.payload};
        };

        case quoteAction.quoteActionTypes.LOAD_FAILED:
        default: {
            return state;
        }
    }
}

 export const getfromQuote = (state:State) => state.quote;