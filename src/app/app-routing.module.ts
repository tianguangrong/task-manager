import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuardSeivice } from './service/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo:'/login',pathMatch:"full" },
    { path: 'register', redirectTo:'/register',pathMatch:"full" },
    { path: 'project', loadChildren:'app/project#ProjectModule',pathMatch:"full" ,canActivate:[AuthGuardSeivice]},
    { path: 'taskLists/:id', loadChildren:'app/task#TaskModule',pathMatch:"full",canActivate:[AuthGuardSeivice]},
    { path: 'mycal/:view', loadChildren:'app/my-calendar#MyCalendarModule',pathMatch:"full",canActivate:[AuthGuardSeivice]}
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule,CommonModule]
})
export class AppRoutingModule {}
