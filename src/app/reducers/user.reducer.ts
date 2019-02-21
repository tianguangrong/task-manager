import * as userGeneric from '../actions/user.action';
import * as projectGeneric from '../actions/project.action';
import { User, Project } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export declare interface  State {
    ids:string[];
    entities:{[id:string]:User};
}

export const initialState: State = {
        ids:[],
        entities:{} 
};

const searchUser = (state,action) => {
    //获取传过来的最新的user信息
    const users = action.payload;
    if (users === null) {
        return state;
      }
    //筛选出每个user的id
    const userIds = users.map(pros => pros.id);
    //用原来的user和最新的user的id对比,得出不相同的id
    const newUsers = users.filter((pros)=>pros != state.entities[pros.id]);
    let newIds = newUsers.map((pro)=>pro.id);
    //将user对象转换成{id:{}}的类型
    //const userEntities = _.chain(tasks).keyBy('id').mapValues(o=>o).value();
    //将newId对应的user转化成state.entities的类型d
    if(newIds.length == 0){
        return state
    }
    const newEntities = newUsers.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
    //返回一个新的state
    return {
        ...state,
        ids:newIds,
        entities:{...state.entities,...newEntities},
    }
}

 const addUser = (state,action) => {
     const user  = action.payload;
     const newId = user.id;
     if(state.entities[newId]){
         return state;
     }
     const newEntities = {...state.entities,[user.id]:user}
    return state.entities[user.id] ? 
            {...state,entities:newEntities} :
            {...state,ids:[...state.ids,newId],entities:newEntities}


}

const updateUser = (state,action) =>{
    const users = <User[]>action.payload;
    const incomingEntities = _.chain(users)
        .keyBy("id")
        .mapValues(o=>o)
        .value();
    const entities = {...state.entities,...incomingEntities}
    return {...state,entities:entities}
}

const delUser = (state,action) => {
    const user =  action.payload;
    const newEntities = {...state.entities,[user.id]:user};
    return state.entities[user.id]
        ?{...state.entities,newEntities}
        :state;
}


export function reducer(state = initialState, action: userGeneric.UserActions ): State {
    switch (action.type) {
        case userGeneric.userActionTypes.SEARCH_USER_SUCCESS: 
        case userGeneric.userActionTypes.SEARCH_SUCCESS: {
            return searchUser(state,action);
        };
        case userGeneric.userActionTypes.ADD_SUCCESS: {
            return addUser(state,action);
        }; 
        case userGeneric.userActionTypes.UPDATE_SUCCESS: {
            return updateUser(state,action); 
        };
        case userGeneric.userActionTypes.DELETE_SUCCESS: {
            return delUser(state,action); 
        };
        default: {
            return state;
        }
    }
}

export const getIds = (state:State) => state.ids;
export const getEntities = (state:State) => state.entities;

export const getUsers = createSelector(getIds,getEntities,(ids,entities)=>{
    
    return ids.map((id)=>{
        //console.log("getAll:"+JSON.stringify(entities[id]))
        return entities[id]
    })
})