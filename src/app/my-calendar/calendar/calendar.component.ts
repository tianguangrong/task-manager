import { Component, OnInit } from '@angular/core';
import { CalendarEvent} from 'angular-calendar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { TaskService } from '../../service/task.service';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { endOfDay, startOfDay } from 'date-fns';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

const getColor = (priority) =>{
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
    return colors.blue;
    case 3:
    return colors.yellow;
    default:
      break;
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  viewDate:Date;
  view$:Observable<string>;
  events$:Observable<CalendarEvent[]>;

  constructor(
    private router:ActivatedRoute,
    private service$:TaskService,
    private store$:Store<fromRoot.State>
    
    ) { 
    this.viewDate = new Date();
    this.view$ = this.router.paramMap.map(v => v.get('view'));
    this.events$ = this.store$.select(fromRoot.getAuthState).map(auth => auth.user.id)
      .switchMap(userId=>this.service$.getUserTasks(userId))
      .map(tasks=>tasks.map(task =>{
        return {
          start:startOfDay(task.createDate),
          end:endOfDay(task.dueDate),
          title:task.desc,
          color:getColor(task.priority)
        }
      }))
  }

  ngOnInit() {
  }

}
