import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService } from '../service/quote.service';
import { ProjectService } from './project.service';
import { TaskListService } from './task-list.service';
import { TaskService } from './task.service';
import { UserService } from './user.service';
import { AuthGuardSeivice } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    QuoteService,
    {
      provide:"HTTP_BASE",
      useValue:{
        uri:"http://localhost:3000"
      }
    },
    ProjectService,
    TaskListService,
    TaskService,
    UserService,
    AuthGuardSeivice,
    AuthService
  ]
})
export class ServiceModule { }
