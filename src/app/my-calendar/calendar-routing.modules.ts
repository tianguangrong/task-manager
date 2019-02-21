import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component'

const routes: Routes = [
    { path: '', component: CalendarComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule {}
