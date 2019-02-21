import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component'
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToright } from '../../animations/routing-anim';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../reducers';
import { Store }  from '@ngrx/store';
import * as taskListGeneric from '../../actions/task-list.action';
import * as taskGeneric from '../../actions/task.action';
import { TaskList, Task } from '../../domain';
import { SearchUserAction } from '../../actions/user.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations:[
    slideToright
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  
  // @HostBinding("@routerAnim") state
  projectId$:Observable<string>;
  lists$:Observable<TaskList[]>;
  projectId:string;
  constructor(
    public dialog:MdDialog,
    private cd:ChangeDetectorRef,
    private route:ActivatedRoute,
    private store$:Store<fromRoot.State>
    ) {
     this.projectId$ = this.route.params.pluck("id");
     this.projectId$.subscribe(res=>{
       this.projectId = res
     })
     this.lists$ = this.store$.select(fromRoot.getTasksByLists);
    }

  ngOnInit() {
    
  }

  launchOpenNewTaskDialog(list){
    //拿到store里面Auth,通过Auth获取登陆人信息
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth=>auth.user);
    //在新建任务的时候将登陆人信息传导NewTaskComponent
    user$.take(1).map(user=>this.dialog.open(NewTaskComponent,{data:{title:"新建任务",owner:user}}))
    //流中有流,进行拍扁操作
      .switchMap(dialogRef=>dialogRef.afterClosed().take(1).filter(n=>n))
      .subscribe(val=>{
        //将val的值组成成Task dipatch 给addAction
        this.store$.dispatch(new taskGeneric.AddAction({...val,taskListId:list.id,completed:false,createDate:new Date()}))
      })
  }

  launchCopyTaskDialog(list){
   // const dialogRef = this.dialog.open(CopyTaskComponent,{data:{lists:this.lists}});
   this.lists$.map(li => li.filter(l=>l.id !== list.id))
   .map(l => this.dialog.open(CopyTaskComponent,{data:{lists:l}}))
   .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n=>n))
   .subscribe((val)=>this.store$.dispatch(new taskGeneric.MoveAllAction({srcListId:list.id,targetListId:val})))
  }

  onEditTaskClick(task){
    const dialogRef = this.dialog.open(NewTaskComponent,{data:{title:"修改任务",task:task}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n=>n)
      .subscribe((val)=>{
        this.store$.dispatch(new taskGeneric.UpdateAction({...task,...val}));
    })
  }

  launchDeleteTaskDialog(list){
    const dialogref = this.dialog.open(ConfirmComponent,{data:{title:"删除任务",content:"确定删除此任务？"}})
    dialogref.afterClosed()
      .take(1)
      .filter(n=>n)
      .subscribe((_:any)=>{
        this.store$.dispatch(new taskListGeneric.DeleteAction(list));
    })
  }

  onNewTaskListClick(){
    const dialogref = this.dialog.open(NewTaskListComponent,{data:{title:"新建项目列表"}});
    dialogref.afterClosed()
      .take(1)
      .filter(n=>n)
      .subscribe((res) =>{
      this.store$.dispatch(new taskListGeneric.AddAction({...res,projectId:this.projectId}))
    })
  }

  launchEditTaskNameDialog(list){
    const dialogref = this.dialog.open(NewTaskListComponent,{data:{title:"更改列表名称",list:list}});
    dialogref.afterClosed()
      .take(1)
      .subscribe((res) =>{
        var hhh = {...res,id:list.id}
        console.log('zuheRes=>:'+JSON.stringify(hhh));
       console.log('res=>:'+JSON.stringify(list));
      this.store$.dispatch(new taskListGeneric.UpdateAction({...res,id:list.id,projectId:this.projectId}))
    })
  }

  handleMove(srcData,list){
   
    switch (srcData.tag) {
      case "task-list":
        console.log("handling list!");
        const listOrder = list.order;
        const srcOrder = srcData.order;
        srcData.order = listOrder;
        list.order = srcOrder;
        break;
      case "task-item":
      break;
      default:
        break;
    }
  }

  onQuicktaskClick(desc:string,list){
    //拿到store里面Auth,通过Auth获取登陆人信息
    const user$ = this.store$.select(fromRoot.getAuthState).map(auth=>auth.user);
    //
    user$.take(1).subscribe(user =>this.store$.dispatch(new taskGeneric.AddAction({
      desc:desc,
      completed:false,
      priority:3,
      taskListId:list.id,
      ownerId:user.id,
      createDate:new Date(),
      participantIds:[]
    })))
  }  

}
