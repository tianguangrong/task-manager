import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getDate } from 'date-fns';
import { Project } from '../../domain';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as genericProject from '../../actions/project.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  projects$:Observable<Project[]>;

  constructor(
    private store$:Store<fromRoot.State>

  ) {
    this.projects$ = this.store$.select(fromRoot.getProjects);
   }

  @Output() toggleSd = new EventEmitter<void>();
  private today:string;

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  onClick(){
    this.toggleSd.emit();
  }

  onPriClick(pri:Project){
    this.toggleSd.emit();
    this.store$.dispatch(new genericProject.SelectProjectAction(pri))
  }

}
