//装饰器
import { Injectable } from '@angular/core';
//effect
import { Effect, Actions, toPayload } from '@ngrx/effects';
//actions
import * as ActionGeneric from '../actions/quote.action';
//quoteService
import { QuoteService } from "../service/quote.service";
//store
import { Store, Action } from '@ngrx/store'

import * as fromRoot from '../reducers';
//流
import { Observable } from 'rxjs/Observable'

@Injectable()
export class QuoteEffects {

    constructor(
        public service$:QuoteService,
        public actions$:Actions,
    ){}

    @Effect()
    quote$:Observable<Action> = this.actions$
        .ofType(ActionGeneric.quoteActionTypes.LOAD)
        .map(toPayload)
        .switchMap((_) => this.service$.getQuote()
          .map((q) => new ActionGeneric.quoteSuccessAction(q))
          .catch((err)=>Observable.of(new ActionGeneric.quoteFailedAction(JSON.stringify(err))))
    )
        
    
}