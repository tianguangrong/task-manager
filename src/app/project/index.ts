import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewProjectComponent } from './new-project/new-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectRoutingModule } from './project-routing.module';
import { InviteComponent } from './invite/invite.component';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
  ],
  declarations: [
    NewProjectComponent, 
    ProjectListComponent, 
    ProjectItemComponent, 
    InviteComponent,
  ],
  exports:[
    ProjectRoutingModule,
    NewProjectComponent, 
    ProjectListComponent, 
    ProjectItemComponent,
    InviteComponent,
  ],
  entryComponents:[
    NewProjectComponent, 
    ProjectListComponent, 
    ProjectItemComponent,
    InviteComponent,
  ]
})
export class ProjectModule { }
