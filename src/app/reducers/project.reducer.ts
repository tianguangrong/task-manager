import * as projectGeneric from '../actions/project.action';
import { Project } from '../domain';
import * as _ from 'lodash';
import { createSelector } from 'reselect';

export declare interface  State {
    ids:string[];
    entities:{[id:string]:Project};
    selectedId: null | string ;
}

export const initialState: State = {
        ids:[],
        entities:{},
        selectedId:''
};

const searchProject = (state,action) => {
    //获取传过来的最新的project信息
    const projects = action.payload;
    if (projects === null) {
        return state;
      }
    //筛选出每个project的id
    const projectIds = projects.map(pros => pros.id);
    //用原来的project和最新的project的id对比,得出不相同的id
    const newProjects = projects.filter((pros)=>pros != state.entities[pros.id]);
    let newIds = newProjects.map((pro)=>pro.id);
    //将project对象转换成{id:{}}的类型
    //const projectEntities = _.chain(projects).keyBy('id').mapValues(o=>o).value();
    //将newId对应的project转化成state.entities的类型d
    if(newIds.length == 0){
        return state
    }
    const newEntities = newProjects.reduce((entities, obj) => ({...entities, [obj.id]: obj}), {});
    //返回一个新的state
    var ggg = [...state.ids,...newIds]
    console.log(JSON.stringify(ggg));
    return {
        ids:newIds,
        entities:{...state.entities,...newEntities},
        selectedId:null
    }
}

 const addProject = (state,action) => {
     const project  = action.payload;
     const newId = project.id;
     if(state.entities[newId]){
         return state;
     }
    return {
        ids:[...state.ids,newId],
        entities:{...state.entities, [project.id]:project},
        selectedId:null
    }


}

const updateProject = (state,action) =>{
    const project = action.payload;
    const entities = {...state.entities,[project.id]:project}
    return {...state,entities:entities}
}

const delProject = (state,action) => {
    const project =  action.payload;
    const newIds = state.ids.filter((id)=>id !== project.id);
    const newEntities = newIds.reduce((entities,id)=>({...entities,[id]:state.entities[id]}),{});
    //const newEntities = newIds.reduce((entities, id) => ({...entities, [id]: state.entities[id]}), {});
    return {
        ids:newIds,
        entities:newEntities,
        selectedId:null
    }
}
 const selectProject = (state,action) => {
     const project = action.payload;
    return {
        ...state,
        selectedId:project.id
    }
}

export function reducer(state = initialState, action: projectGeneric.ProjectActions ): State {
    switch (action.type) {
        case projectGeneric.projectActionTypes.SEARCH_SUCCESS: {
            return searchProject(state,action);
        };
        case projectGeneric.projectActionTypes.ADD_SUCCESS: {
            return addProject(state,action);
        };
        case projectGeneric.projectActionTypes.INVITE_SUCCESS: 
        case projectGeneric.projectActionTypes.UPDATE_SUCCESS: {
            return updateProject(state,action); 
        };
        case projectGeneric.projectActionTypes.DELETE_SUCCESS: {
            return delProject(state,action); 
        };
        case projectGeneric.projectActionTypes.SELECT_PROJECT: {
            return selectProject(state,action); 
        };
        default: {
            return state;
        }
    }
}

export const getIds = (state:State) => state.ids;
export const getEntities = (state:State) => state.entities;
export const getSlectedId = (state:State) => state.selectedId;

export const getAll = createSelector(getIds,getEntities,(ids,entities)=>{
    
    return ids.map((id)=>{
        //console.log("getAll:"+JSON.stringify(entities[id]))
        return entities[id]
    })
})