import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User, Project } from '../domain';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  //设置http的请求头信息
  private headers = new Headers({
    'content-Type':'applications/json'
  });
  private readonly domain = 'users'

  constructor(
    //在构造函数中实例化http模块
    private http:Http,
    //引入公共信息
    @Inject('HTTP_BASE') private config
  ) { }

  //通过输入的字母智能提示用户
  searchUser(filter:string):Observable<User[]>{
    //确定具体路径
    const uri = `${this.config.uri}/${this.domain}`;
    //通过json-server的params方法获取到输入值email字段存在的用户信息.
    return this.http.get(uri,{params:{'email_like':filter}})
    //放回json数据
        .map(res=> res.json() as User[])
  }
  //通过项目得到所有的用户信息.
  getUsersByProject(pId:string):Observable<User[]>{
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get(uri,{params:{projectId:pId}})
      .map(res=> res.json() as User[])
  }

  //向user里面添加项目Id;
  addProjectRef(user:User,pId:string):Observable<User>{
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    //需要更新的字典
    const upDateRef = {
      //如果projectIds存在则将它展开,如果不存在,则实例一个数组
      projectIds:user.projectIds?[...user.projectIds,pId]:[pId]
    }
    return this.http
      .patch(uri,JSON.stringify(upDateRef),{headers:this.headers})
      .map(res=>res.json() as User)
  }

  //在用户信息中移除指定的项目Id;
  removeProjectRef(user:User,pId:string):Observable<User>{
    //确定路径
    const uri = `${this.config.uri}/${this.domain}`;
    //确定需要删除的pid在user.projectIds数组中的位置
    const index = user.projectIds.indexOf(pId);
    //判断user.projectIds是否为空;
    const projectIds = user.projectIds?user.projectIds:[];
    //需要更新的信息;
    const upDateRef = {
      //用slice方法将数组中的pid信息剔除
      projectIds:[...projectIds.slice(0,index),...projectIds.slice(index+1)]
    }
    //判断用户是否存在需要删除的项目,如果没有就直接返回用户信息
    if(index == -1){
      Observable.of(user);
    }
    return this.http.patch(uri,JSON.stringify(upDateRef),{headers:this.headers})
      .map(res=> res.json());
  }
  //添加项目到多个用户信息中;
  batchUpdateProjectRef(project:Project):Observable<User[]>{
    //获取项目的id
    const pId = project.id;
    //获取项目中用户的id;
    const mems = project.members?project.members:[];
    //将从项目中获取的用户Id的数组拿到后,把他当做流来发射出去并做拍扁处理
    return Observable.from(mems).switchMap((id)=>{
      //拿到user的路径
      const uri = `${this.config.uri}/${this.domain}/${id}`
      //通过get方法请求每个user的信息;
      return this.http.get(uri).map(res=>res.json())
    })
    //过滤出没有储存该项目的成员;
    .filter((user)=>user.projectIds.indexOf(pId) === -1)
    //将这些用户进行拍扁处理,然后用this.addProjectRef方法将用户添加到该项目中去;
    .switchMap((u)=>this.addProjectRef(u,pId))
    //处理成数组,返回回去;
    .reduce((arr,cur)=>[...arr,cur],[])
  }

}
