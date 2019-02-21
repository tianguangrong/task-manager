import * as taskListGeneric from '../actions/task-list.action';
import * as projectGeneric from '../actions/project.action';
import { TaskList, Project } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export declare interface  State {
    ids:string[];
    entities:{[id:string]:TaskList};
    selectedIds: string[];
}

export const initialState: State = {
        ids:[],
        entities:{},
        selectedIds:[]
};

const searchTaskList = (state,action) => {
    //获取传过来的最新的taskList信息
    const taskLists = action.payload;
    if (taskLists === null) {
        return state;
      }
    //筛选出每个taskList的id
    const taskListIds = taskLists.map(pros => pros.id);
    //用原来的taskList和最新的taskList的id对比,得出不相同的id
    const newTaskLists = taskLists.filter((pros)=>pros != state.entities[pros.id]);
    let newIds = newTaskLists.map((pro)=>pro.id);
    //将taskList对象转换成{id:{}}的类型
    //const taskListEntities = _.chain(taskLists).keyBy('id').mapValues(o=>o).value();
    //将newId对应的taskList转化成state.entities的类型d
    if(newIds.length == 0){
        return state
    }
    const newEntities = newTaskLists.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
    //返回一个新的state
    return {
        ...state,
        ids:newIds,
        entities:{...state.entities,...newEntities},
    }
}

 const addTaskList = (state,action) => {
     const taskList  = action.payload;
     const newId = taskList.id;
     if(state.entities[newId]){
         return state;
     }
    return {
        ...state,
        ids:[...state.ids,newId],
        entities:{...state.entities, [taskList.id]:taskList}
    }


}

const updateTaskList = (state,action) =>{
    const taskList = action.payload;
    const entities = {...state.entities,[taskList.id]:taskList}
    return {...state,entities:entities}
}

const delTaskList = (state,action) => {
    const taskList =  action.payload;
    const newIds = state.ids.filter((id)=>id !== taskList.id);
    const newEntities = newIds.reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});
    //const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
    let newSelectIds;
    if(state.selectedIds.length == 0){
         newSelectIds = []
    }else{
         newSelectIds = state.selectedIds.filter((id)=>taskList.id !== id);
    }
    
    return {
        ids:newIds,
        entities:newEntities,
        selectedIds:newSelectIds
    }
}

const swapTaskLists = (state,action) => {
    const taskLists =  <TaskList[]>action.payload;
    const updateEntities = _.chain(taskLists).keyBy("id").mapValues(o=>o).value()
   const newEntities = {...state.entities,...updateEntities};
    return {
        ...state,
        entities:newEntities
    }
}

const selectProject = (state,action)=>{
    const selectedPro = <Project>action.payload;
    const selectedIds = state.ids.filter((id)=>state.entities[id].projectId == selectedPro.id)
    return{
        ...state,
        selectedIds:selectedIds
    }
}

const delListByProj = (state,action)=>{
    const project = <Project>action.payload;
    const taskListIds = project.taskLists;
    const remainderIds = _.difference(state.ids,taskListIds);
    const newEntities = remainderIds.reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...remainderIds],
        entities:newEntities,
        selectedIds:[]
    }
}

export function reducer(state = initialState, action: taskListGeneric.TaskListActions ): State {
    switch (action.type) {
        case taskListGeneric.taskListActionTypes.SEARCH_SUCCESS: {
            return searchTaskList(state,action);
        };
        case taskListGeneric.taskListActionTypes.ADD_SUCCESS: {
            return addTaskList(state,action);
        };
        case taskListGeneric.taskListActionTypes.SWAP_SUCCESS: 
        case taskListGeneric.taskListActionTypes.UPDATE_SUCCESS: {
            return updateTaskList(state,action); 
        };
        case taskListGeneric.taskListActionTypes.DELETE_SUCCESS: {
            return delTaskList(state,action); 
        };
        case taskListGeneric.taskListActionTypes.SWAP_SUCCESS: {
            return swapTaskLists(state,action); 
        };
        case projectGeneric.projectActionTypes.SELECT_PROJECT: {
            return selectProject(state,action); 
        };
        case projectGeneric.projectActionTypes.DELETE_SUCCESS: {
            return delListByProj(state,action); 
        };
       
        default: {
            return state;
        }
    }
}

export const getIds = (state:State) => state.ids;
export const getEntities = (state:State) => state.entities;
export const getSlectedIds = (state:State) => state.selectedIds;

export const getSelected = createSelector(getIds,getEntities,(ids,entities)=>{
    
    return ids.map((id)=>{
        //console.log("getAll:"+JSON.stringify(entities[id]))
        return entities[id]
    })
})