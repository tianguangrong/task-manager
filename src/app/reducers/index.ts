import { NgModule } from '@angular/core';
//redux 概念三要素中的store
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
//ngrx为路由提供的store
import { RouterStoreModule } from '@ngrx/router-store';
//为开发者工具提供的接口
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//引入ngrx关于reducer处理的方法
//import { storeFreeze } from 'ngrx-store-freeze';
//引入ngrx关于方法合并的方法
import { compose } from '@ngrx/core/compose';

//引入自己写的reducer
import * as  fromQuoteReducer from './quote.reducer';
import * as  fromAuthReducer from './auth.reducer';
import * as  fromProjectReducer from './project.reducer';
import * as  fromTaskListReducer from './task-list.reducer';
import * as  fromTaskReducer from './task.reducer';
import * as  fromUserReducer from './user.reducer';
import { environment } from 'environments/environment.prod';

import { createSelector } from 'reselect';
import { Auth, Project } from '../domain';

//创建另外一个reducer对模块里面所有的reducer进行整合处理
export interface State {
    quote:fromQuoteReducer.State;
    auth:Auth;
    project:fromProjectReducer.State;
    taskList:fromTaskListReducer.State;
    task:fromTaskReducer.State;
    users:fromUserReducer.State
};

const initialState: State = {
      quote:fromQuoteReducer.initialState,
      auth: fromAuthReducer.initialState,
      project: fromProjectReducer.initialState,
      taskList:fromTaskListReducer.initialState,
      task:fromTaskReducer.initialState,
      users:fromUserReducer.initialState
};

const reducers = {
    quote: fromQuoteReducer.reducer,
    auth: fromAuthReducer.reducer,
    project: fromProjectReducer.reducer,
    taskList:fromTaskListReducer.reducer,
    task:fromTaskReducer.reducer,
    users:fromUserReducer.reducer
}

//生产环境和开发环境的合并;
//storeFreeze:如果开发过程中将reducer的状态改变而不是以一个新的状态呈现,就会被报错
const productionReducers:ActionReducer<State> = combineReducers(reducers);
const developmentReducers:ActionReducer<State> = combineReducers(reducers);// compose(combineReducers,storeFreeze)(reducers);

export function reducer(state = initialState, action: any ): State {
    return environment.production ? productionReducers(state,action) : developmentReducers(state,action);
}

//另外一个reducer结束

@NgModule({
    imports: [
        //将自己写的reducer注入store的静态工厂方法里;
        StoreModule.provideStore(reducer),
        //为routerStore提供了一个静态工厂方法,
        RouterStoreModule.connectRouter(),
        //为开发者工具提供了静态方法的钩子,,方便显示状态的变化 
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ]
})
export class AppStoreModule {}


export const getQuoteState = (state:State) => state.quote;
export const getAuthState = (state:State) => state.auth;
export const getProjectsState = (state:State) => state.project;
export const getTaskListState = (state:State) => state.taskList;
export const getTaskState = (state:State) => state.task;
export const getUserState = (state:State) => state.users;

export const getQuote = createSelector(getQuoteState,fromQuoteReducer.getfromQuote);
export const getProjects = createSelector(getProjectsState, fromProjectReducer.getAll);
export const getTaskLists = createSelector(getTaskListState,fromTaskListReducer.getSelected);
export const getTasks = createSelector(getTaskState,fromTaskReducer.getTasks);
export const getUsers = createSelector(getUserState,fromUserReducer.getUsers);

export const getUserEntities = createSelector(getUserState,fromUserReducer.getEntities);
export const getTasksWithOwners = createSelector(getTasks,getUserEntities,(tasks,userEntities)=>{
    return tasks.map((task)=>{
        return {
            ...task,
            owner:userEntities[task.ownerId],
            participant:task.participantIds.map(id=>userEntities[id])
        }
    })
})
export const getTasksByLists = createSelector(getTaskLists,getTasksWithOwners,(lists,tasks)=>{
    return lists.map(list=>{
        return {
            ...list,
            tasks:tasks.filter(task=>task.taskListId === list.id)
        }
    })
})

export const getProjectUsers = (projectId:string)=>{
    return createSelector(getProjectsState,getUserEntities,(state,userEntities)=>{
        return state.entities[projectId].members.map(memId => userEntities[memId])
    })
}