import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


export interface dragData{
  tag:string;
  data:any
}

@Injectable()
export class DragDropService {
  
  private _data = new BehaviorSubject<dragData>(null)
   
  
  constructor() {}

  setDragData(data:dragData){
    this._data.next(data);
  }
  
  getDragData(){
    return this._data.asObservable() ;
  }

  clearDragData(){
    this._data.next(null);
  }

}
