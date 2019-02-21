import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { CalendarRoutingModule } from './calendar-routing.modules';

@NgModule({
  imports: [
    SharedModule,
    CalendarModule.forRoot(),
    CalendarRoutingModule
  ],
  exports:[
    CalendarModule,
    CalendarRoutingModule
  ],
  declarations: [CalendarComponent]
})
export class MyCalendarModule { }
