import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Auth, User} from '../domain';

@Injectable()
export class AuthService {

  //声明一个只读的常量;
  private readonly domain = 'users';

  //实例化请求头;
  private headers = new Headers({
    'content-Type':'application/json'
  })

  //模拟一个TOKEN;
  private token = 'h5ru25jb52hb525b2'+
                  '.gsgNNkkkMNBggjns4j3ij43ij27m7'+
                  '.gdkfgjsi454j47n8k9m9lkQI';    

  constructor(
    private http:Http,
    @Inject('HTTP_BASE') private config
  ) { }

  //注册
  register(user:User):Observable<Auth>{
    //确定请求路径;
    const uri = `${this.config.uri}/${this.domain}`;
    //首先判断该用户是否已经注册.
    return this.http.get(uri,{params:{'email':user.email}})
      .switchMap((res)=>{
        if(res.json().length > 0){
          throw 'email existed!'
        }
        //如果没有被注册,用post方法将用户添加到数据库,然后返回一个Auth类型的字典.
        return this.http.post(uri,JSON.stringify(user),{headers:this.headers})
          .map((user)=>{
            return {
              token:this.token,
              user:user.json()
            }
          })
      })
  }

  //登陆
  login(username:string,password:string):Observable<Auth>{
    const uri = `${this.config.uri}/${this.domain}`;
    //将账号和密码传到后台,看后台是否能够匹配.
    return this.http.get(uri,{params:{'email':username,'password':password}})
      .map(res=>{
        if(res.json().length == 0){
          throw 'email or password is not match!';
        }
        //如果匹配,则返回一个Auth类型的字典.
        return {
          user:res.json()[0],
          token:this.token
        }
      })
  }



}
