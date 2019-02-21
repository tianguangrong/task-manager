import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { debug } from 'util';

 declare module 'rxjs/Observable' {
    interface Observable<T>{
         debug:(_) =>Observable<T>
    }
 }

Observable.prototype.debug = function(mes:string){
    return this.do(
        (next) =>{
            if(!environment.production){
                console.log(mes,next);
            }
        },
        (err)=>{
            if(!environment.production){
                console.error('Error>>'+mes,err);
            }
        },
        ()=>{
            if(!environment.production){
                console.log('completed it')
            }
        }
    )
}