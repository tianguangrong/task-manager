import { Component, OnInit, Input, HostListener } from '@angular/core';
import { taskAnims } from '../../animations/task-anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations:[
    taskAnims
  ]
})
export class TaskItemComponent implements OnInit {

  @Input() item;
  @Input() avatar;
  state = "out"

  constructor() { }

  ngOnInit() {
    this.avatar = (this.item.owner)?this.item.owner.avatar:"unassigned"
  }

  onClick(ev:Event){
    ev.stopPropagation();
  }

  @HostListener("mouseenter" )
  onMouseenter(){
    this.state = "hover";
  }
  @HostListener("mouseleave")
  onMouseleave(){
    this.state = "out";
  }

}
