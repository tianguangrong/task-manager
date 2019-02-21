export interface Task {
    id?:string;
    desc:string;
    completed:boolean;
    priority:number;
    dueDate?:Date;
    remainder?:Date;
    remark?:string;
    createDate:Date;
    ownerId?:string;
    participantIds:Array<string>;
    taskListId:string;
}