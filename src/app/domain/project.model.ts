export interface Project {
    id?:string;
    name:string;
    desc?:string;
    coverImg:string;
    taskLists?:Array<string>;
    members?:string[];

}