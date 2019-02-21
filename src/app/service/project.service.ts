import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { Project, User } from '../domain';
import { Observable } from 'rxjs';
import * as _ from "lodash";

@Injectable()
export class ProjectService { 

  private  readonly domain = 'projects';
  private headers = new Headers({
    'content-Type':'application/json'
  });

  constructor(
    private http:Http,
    @Inject("HTTP_BASE") private config 
  ) { };
  

  //添加数据 post
  add(project:Project):Observable<Project> {
    //json-server 会自动生成 id,所以为了避免自带id,进行id清空操作;
    project.id = null ;
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}`;
    //利用http的post方法将数据推送给后台,并返回一个全新的数据
    return this.http
    //三个参数:1.路径;2.json格式的需要添加的数据;3.添加headers;
    .post(uri,JSON.stringify(project),{headers:this.headers})
    //将所有的数据返回;
    .map((res)=>res.json());
  }

  //更新数据 patch ;
  update(project:Project):Observable<Project> {
    const toUpdate = {
      name:project.name,
      des:project.desc,
      coverImg:project.coverImg
    }
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    //利用http的post方法将数据推送给后台,并返回一个全新的数据
    return this.http
    //三个参数:1.路径;2.json格式的需要更新的数据;3.添加headers;
    .patch(uri,JSON.stringify(toUpdate),{headers:this.headers})
    //将所有的数据返回;
    .map((res)=>res.json());
  }

   //删除数据 delete ;
   delete(project:Project):Observable<Project> {
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const delTask$ = Observable
      .from(project.taskLists?project.taskLists:[])
      .mergeMap((listId)=>this.http.delete(`${this.config.uri}/taskLists/${listId}`))
      .count();
    return Observable.from('1').switchMap(_ => this.http.delete(uri).mapTo(project));
  }

  //获取数据 get ;
  get(userId:string):Observable<Project[]> {
    //生成需要访问的路径
    const uri = `${this.config.uri}/${this.domain}`;
    //利用json-server的传值方式,通过members里的userId获取每个Id下的所有project;
    return this.http.get(uri,{params:{members_like:userId}})
    //返回json格式并且利用 as ... 将他进行类型强转
    .map(res =>{
      return res.json() as Project[];
    })
  }

  //invite ;
  invite(projectId:string,users:User[]):Observable<Project> {
    
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    return this.http.get(uri)
      .map(res => res.json() as Project)
      .switchMap((project:Project) => {
        const existingMems = project.members;
        const inviteIds = users.map(user=>user.id)
        const newIds = _.union(existingMems,inviteIds)
        return this.http.patch(uri,JSON.stringify({members:newIds}),{headers:this.headers})
        .map(res => res.json())
      })
    
  }

}
