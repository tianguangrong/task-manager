import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Task, TaskList } from '../domain';

@Injectable()
export class TaskService {

  private readonly domain = 'tasks';
  private headers = new Headers({
    'content-Type':'application/json'
  });

  constructor(
    private http:Http,
    @Inject("HTTP_BASE") private config

  ) { }

    //添加数据 post
    add(task:Task):Observable<Task> {
      //json-server 会自动生成 id,所以为了避免自带id,进行id清空操作;
      task.id = null ;
      //生成需要访问的路径
      const uri = `${this.config.uri}/${this.domain}`;
      //利用http的post方法将数据推送给后台,并返回一个全新的数据
      return this.http
      //三个参数:1.路径;2.json格式的需要添加的数据;3.添加headers;
      .post(uri,JSON.stringify(task),{headers:this.headers})
      //将所有的数据返回;
      .map((res)=>res.json());  
    }
  
    //更新数据 patch ;
    update(task:Task):Observable<Task> {
      const toUpdate = {
        des:task.desc,
        priority:task.priority,
        dueDate:task.dueDate,
        remainder:task.remainder,
        ownerId:task.ownerId,
        participantIds:task.participantIds,
        remark:task.remark
      }
      //生成需要访问的路径
      const uri = `${this.config.uri}/${this.domain}`;
      //利用http的post方法将数据推送给后台,并返回一个全新的数据
      return this.http
      //三个参数:1.路径;2.json格式的需要更新的数据;3.添加headers;
      .post(uri,JSON.stringify(toUpdate),{headers:this.headers})
      //将所有的数据返回;
      .map((res)=>res.json());
    }
  
      //删除数据 delete ;
   delete(task:Task):Observable<Task> {
    //生成需要访问的路径;
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
      return this.http.delete(uri).mapTo(task);
    }
  
    //获取数据 get ;
    get(taskListId:string):Observable<Task[]> {
      //生成需要访问的路径
      const uri = `${this.config.uri}/${this.domain}`;
      //利用json-server的传值方式,通过members里的userId获取每个Id下的所有task;
      return this.http.get(uri,{params:{'taskListId':taskListId}})
      //返回json格式并且利用 as ... 将他进行类型强转
      .map(res =>{
        return res.json() as Task[];
      });
    }

    // 获取一个项目里的所有任务;
    getByLists(lists:TaskList[]){
      return Observable.from(lists)//将数组以流的方式发射出去
        //将发射出来的流进行拍扁操作;
        .mergeMap(list => this.get(list.id))
        //将流里面的数组合并成一个数组
        .reduce((tasks:Task[],ts:Task[])=>{
          //利用数组展开的方式
          return [...tasks,...ts]
        },[])
    }

    //进行完成任务和取消完成任务的后台数据转换操作;
    complete(task:Task):Observable<Task>{
      //获取任务路径;
      const uri = `${this.config.uri}/${this.domain}/${task.id}`;
      return this.http
      //通过patch更新task中的属性complete;
      .patch(uri,JSON.stringify({complete:!task.completed}),{headers:this.headers})
      //返回数据的格式为JSON格式
      .map(res => res.json());
    }

    //将单个任务移动到另外一个任务列表中去;
    move(taskId:string,taskListId:string):Observable<Task>{
      //获取任务路径;
      const uri = `${this.config.uri}/${this.domain}/${taskId}`;
      //更新下task里面的taskListId 
      return this.http.patch(uri,JSON.stringify({'taskListId':taskListId}),{headers:this.headers})
      .map(res => res.json());
    }

    //移动整个任务列表到另一个任务列表;
    moveAll(taskListId:string,taskTargetListId:string):Observable<Task[]>{
      //获取需要移动的列表中的所有任务
      return this.get(taskListId)
      //将这个任务列表中的任务以一个流的方式发射出去
        .mergeMap(tasks => Observable.from(tasks))
        //通过Move方法将每个任务的taskListId更新成移动到的那个列表id
        .mergeMap(tsk=>this.move(tsk.id,taskTargetListId))
        //将所有的任务组合近一个空数组中
        .reduce((tas,t)=>{
          return [...tas,t]
        },[])
    }

    getUserTasks(userId:string):Observable<Task[]>{
      const uri = `${this.config.uri}/${this.domain}`;
      return this.http.get(uri,{params:{userId:userId}})
        .map(res=>res.json() as Task[])
    }


}
