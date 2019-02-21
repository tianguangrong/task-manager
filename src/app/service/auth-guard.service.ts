import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromRoot from  '../reducers';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthGuardSeivice implements CanActivate {

  constructor(private store$:Store<fromRoot.State>){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(fromRoot.getAuthState)
      .map(auth =>{
        const result = auth.token != null && auth.token != ''&& auth.token != undefined;
        if(!result){
          this.store$.dispatch(go(["/login"]))
        }
        return result;
      })
      .defaultIfEmpty(false);
  }
}

