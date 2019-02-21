import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskHeaderComponent implements OnInit {

  @Input() header = "";
  @Output() createTask = new EventEmitter<void>();
  @Output() copyTask = new EventEmitter<void>();
  @Output() deleteTask = new EventEmitter<void>();
  @Output() editTaskName = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onCreateTaskClick():void{
    this.createTask.emit();
  }

  onCopyTaskClick():void{
    this.copyTask.emit();
  }

  onDeleteTaskClick():void{
    this.deleteTask.emit();
  }

  onEditTaskNameClick():void{
    this.editTaskName.emit()
  }

}