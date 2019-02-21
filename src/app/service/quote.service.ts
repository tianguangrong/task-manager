import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Quote } from '../domain/quote.model';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class QuoteService {

  private uri:string;
  constructor(@Inject("HTTP_BASE") private config, private http:Http) {
    this.uri = `${this.config.uri}/quotes/${Math.floor(Math.random()*10)}`
   }

  getQuote():Observable<Quote>{
    return this.http.get(this.uri).map((res)=>res.json());
  }

}
