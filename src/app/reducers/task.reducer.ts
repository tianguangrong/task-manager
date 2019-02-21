import * as taskGeneric from '../actions/task.action';
import * as projectGeneric from '../actions/project.action';
import { Task, Project } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export declare interface  State {
    ids:string[];
    entities:{[id:string]:Task};
}

export const initialState: State = {
        ids:[],
        entities:{}
};

const searchTask = (state,action) => {
    //获取传过来的最新的taskList信息
    const tasks = action.payload;
    if (tasks === null) {
        return state;
      }
    //筛选出每个taskList的id
    const taskListIds = tasks.map(pros => pros.id);
    //用原来的taskList和最新的taskList的id对比,得出不相同的id
    const newTasks = tasks.filter((pros)=>pros != state.entities[pros.id]);
    let newIds = newTasks.map((pro)=>pro.id);
    //将taskList对象转换成{id:{}}的类型
    //const taskListEntities = _.chain(tasks).keyBy('id').mapValues(o=>o).value();
    //将newId对应的taskList转化成state.entities的类型d
    if(newIds.length == 0){
        return state
    }
    const newEntities = newTasks.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
    //返回一个新的state
    var ggg = [...state.ids,...newIds]
    console.log(JSON.stringify(ggg));
    return {
        ...state,
        ids:newIds,
        entities:{...state.entities,...newEntities},
    }
}

 const addTask = (state,action) => {
     const taskList  = action.payload;
     const newId = taskList.id;
     if(state.entities[newId]){
         return state;
     }
    return {
        ids:[...state.ids,newId],
        entities:{...state.entities, [taskList.id]:taskList}
    }


}

const updateTask = (state,action) =>{
    const taskList = action.payload;
    const entities = {...state.entities,[taskList.id]:taskList}
    return {...state,entities:entities}
}

const delTask = (state,action) => {
    const tasks =  action.payload;
    const newIds = state.ids.filter((id)=>id !== tasks.id);
    const newEntities = newIds.reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});
    //const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
  
    return {
        ids:newIds,
        entities:newEntities
    }
}

const moveAllTasks = (state,action)=>{
    const tasks = <Task[]>action.payload;
    const updateEntities = tasks.reduce((entities,task)=>({...entities,[task.id]:task}),{})
    return{
        ...state,
        entities:{...state.entities,...updateEntities}
    }
}

const delByProj = (state,action)=>{
    const project = <Project>action.payload;
    const taskListIds = project.taskLists;
    const remainderIds = state.ids.filter((id)=>taskListIds.indexOf(state.entities[id].taskListId) == -1 )
    const newEntities = remainderIds.reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});
    return {
        ids:[...remainderIds],
        entities:newEntities
    }
}

export function reducer(state = initialState, action: taskGeneric.TaskActions ): State {
    switch (action.type) {
        case taskGeneric.taskActionTypes.SEARCH_SUCCESS: {
            return searchTask(state,action);
        };
        case taskGeneric.taskActionTypes.ADD_SUCCESS: {
            return addTask(state,action);
        };
        case taskGeneric.taskActionTypes.MOVE_SUCCESS: 
        case taskGeneric.taskActionTypes.COMPLETE_SUCCESS: 
        case taskGeneric.taskActionTypes.UPDATE_SUCCESS: {
            return updateTask(state,action); 
        };
        case taskGeneric.taskActionTypes.DELETE_SUCCESS: {
            return delTask(state,action); 
        };
        case taskGeneric.taskActionTypes.MOVE_ALL_SUCCESS: {
            return moveAllTasks(state,action); 
        };
       
        case projectGeneric.projectActionTypes.DELETE_SUCCESS: {
            return delByProj(state,action); 
        };
       
        default: {
            return state;
        }
    }
}

export const getIds = (state:State) => state.ids;
export const getEntities = (state:State) => state.entities;

export const getTasks = createSelector(getIds,getEntities,(ids,entities)=>{
    
    return ids.map((id)=>{
        //console.log("getAll:"+JSON.stringify(entities[id]))
        return entities[id]
    })
})