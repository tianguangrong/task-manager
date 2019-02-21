import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { TaskList } from '../domain'

@Injectable()
export class TaskListService {

  private readonly domain = 'taskLists';
  private headers = new Headers({
    'content-Type':'application/json'
  })

  constructor(
    private http:Http,
    @Inject("HTTP_BASE") private config

  ) { }

  
  //添加数据 post
  add(taskList:TaskList):Observable<TaskList> {
    //json-server 会自动生成 id,所以为了避免自带id,进行id清空操作;
    // taskList.id = null ;
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}`;
    //利用http的post方法将数据推送给后台,并返回一个全新的数据
    return this.http
    //三个参数:1.路径;2.json格式的需要添加的数据;3.添加headers;
    .post(uri,JSON.stringify(taskList),{headers:this.headers})
    //将所有的数据返回;
    .map((res)=>res.json());
  }

  //更新数据 patch ;
  update(taskList:TaskList):Observable<TaskList> {
    console.log(JSON.stringify("taskListService:"+taskList));
    const toUpdate = {
      name:taskList.name
    }
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    //利用http的post方法将数据推送给后台,并返回一个全新的数据
    return this.http
    //三个参数:1.路径;2.json格式的需要更新的数据;3.添加headers;
    .patch(uri,JSON.stringify(toUpdate),{headers:this.headers})
    //将所有的数据返回;
    .map((res)=>res.json());
  }

   //删除数据 delete ;
   delete(taskList:TaskList):Observable<TaskList> {
    //生成需要访问的路径;
    const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
    return this.http
      .delete(uri)
      .mapTo(taskList);
  }

  //获取数据 get ;
  get(projectId:string):Observable<TaskList[]> {
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}`;
    //利用json-server的传值方式,通过members里的userId获取每个Id下的所有taskList;
    return this.http.get(uri,{params:{'projectId':projectId}})
    //返回json格式并且利用 as ... 将他进行类型强转
    .map(res =>{
      return res.json() as TaskList[];
    })
  }

  //拖拽位置转换;
  swapOrder(src:TaskList,target:TaskList){
    //获取拖拽的路径
    const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
    //获取放的路径
    const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
    //将拖和放的两个order的参数呼唤;
    const drag$ = this.http.patch(dragUri,JSON.stringify({order:target.order}),{headers:this.headers})
      .map(res => res.json());
    const drop$ = this.http.patch(dropUri,JSON.stringify({order:src.order}),{headers:this.headers})
      .map(res => res.json());
      //返回:这部操作是多余的,但是必须返回写东西,就将修改的两个流合并放进一个空数组中去了;
    return Observable.merge(drag$,drop$)
      .reduce((arr,list)=>[...arr,list],[]);
  }


}
