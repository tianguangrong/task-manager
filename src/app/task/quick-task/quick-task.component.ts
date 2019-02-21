import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-quick-task',
  templateUrl: './quick-task.component.html',
  styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {

  @Input() desc:string;
  @Output() quickTask = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  @HostListener("keyup.enter")
  quickBuildTask(){
    if(!this.desc || this.desc.length === 0 || !this.desc.trim()){
      return
    }
   this.quickTask.emit(this.desc);
   this.desc = "" ;
  }

}
