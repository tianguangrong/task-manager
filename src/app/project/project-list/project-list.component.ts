import { Component, OnDestroy, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from "../new-project/new-project.component";
import { InviteComponent } from "../invite/invite.component";
import { ConfirmComponent } from '../../shared/confirm/confirm.component'
import { slideToright } from '../../animations/routing-anim';
import { listAnim } from '../../animations/lists-anim';
import { ProjectService } from '../../service/project.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import { Project } from '../../domain';
import * as projectGeneric from '../../actions/project.action' ;
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations:[
    slideToright,
    listAnim
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding("@routerAnim") state;

  projects$:Observable<Project[]>;
  projects;
  listAnim$:Observable<number>;
  private sub:Subscription

  constructor(
    public dialog:MdDialog, 
    public cd:ChangeDetectorRef,
    private service$:ProjectService,
    private store$:Store<fromRoot.State>
  ) {
    this.store$.dispatch(new projectGeneric.SearchAction(null))
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.map(p => p.length);
   }

  ngOnInit() {
  
  }
  
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    
  }

  openNewProjectDialog(){
    const selectedImg = `assets/img/covers/${Math.floor(Math.random()*40)}_tn.jpg`
    const dialogMes = this.dialog.open(
      NewProjectComponent,
      {data:{
        thumbnails:this.getThumbnails(),
        img:selectedImg
      }});
    dialogMes.afterClosed()
      .take(1)
      .filter((n)=>n)
      .map((p)=>{
        return {...p,coverImg:this.rebuildImgSrc(p.coverImg)}
      })
      .subscribe((pro)=>{
       this.store$.dispatch(new projectGeneric.AddAction(pro))
      })
  }

  private getThumbnails(){
    return _.range(0,40)
      .map((i)=> {
       return   `/assets/img/covers/${i}_tn.jpg`
      }); 
  }

  private rebuildImgSrc(imgSrc:string){
    return imgSrc.indexOf('_')>0?imgSrc.split('_')[0]+'.jpg':imgSrc
  }

  openInviteDialog(project:Project){
    //首先拿到这么项目已经参与的人
    this.store$.select(fromRoot.getProjectUsers(project.id))
    //打开InviteComponent的时候将参与人当做参数传递过去
      .map((users)=>this.dialog.open(InviteComponent,{data:{members:users}}))
      //流中有流的情况,进行拍扁处理通过switchMap和mergeMap 
      .switchMap(dialogRef=>dialogRef.afterClosed().take(1).filter(n=>n))
      //将返回来的值通过store发送出去;
      .subscribe(val => this.store$.dispatch(new projectGeneric.InviteAction({projectId:project.id,members:val})))
    
  }

  openEditDialog(project:Project){
    const dialogRef = this.dialog.open(NewProjectComponent,
      {data:{
        thumbnails:this.getThumbnails(),
        project:project
      }});
    dialogRef.afterClosed().take(1)
      .filter((n)=>n)
      .map((val)=>{
        return{...val,id:project.id,coverImg:val.coverImg?this.rebuildImgSrc(val.coverImg):project.coverImg}
      })
      .subscribe((p)=>{
        this.store$.dispatch(new projectGeneric.UpdateAction(p))
      })
      
  }

  openConfirmDialog(project:Project){
   const dialogRef = this.dialog.open(ConfirmComponent,{data:{title:"删除项目",content:"是否要删除项目？"}});
   this.sub = dialogRef.afterClosed()
   .take(1)
   .filter((n)=>n)
   .subscribe((_)=>{
      this.store$.dispatch(new projectGeneric.DeleteAction(project))
   });
  }
  
  openTaskListPage(project:Project){
    this.store$.dispatch(new projectGeneric.SelectProjectAction(project))
  }
 

}
