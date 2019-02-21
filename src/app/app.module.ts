import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project';
import { TaskModule } from './task';
import { DragDropService } from './directive/drag-drop.service';
import { ServiceModule } from './service/service.module';
import { MyCalendarModule } from './my-calendar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    LoginModule,
    ServiceModule,
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [
    DragDropService,
    
  ],
  bootstrap: [AppComponent],
  exports:[
    BrowserModule,
    NoopAnimationsModule
  ]
})
export class AppModule { }
