import { Component, OnInit, Input, Inject,Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { itemAnims } from '../../animations/item-anim';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations:[
    itemAnims
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() invite = new EventEmitter<void>();
  @Output() editProject = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<void>();
  @Output() selected = new EventEmitter<void>();
  @HostBinding("@card") state = "out"

  constructor(private cd:ChangeDetectorRef) { }

  ngOnInit() {
  }

  launchInviteClick(ev:Event){
    ev.stopPropagation();
    this.invite.emit();
  }

  launchEditProjectClick(ev:Event){
    ev.stopPropagation();
    this.editProject.emit();
  }

  launchDeleteClick(ev:Event){
    ev.stopPropagation();
    this.deleteProject.emit();
  }

  @HostListener("mouseover",["$event.target"])
  onMouseover(target){
    this.state = "in";
    this.cd.markForCheck();
  }
  @HostListener("mouseout",["$event.target"])
  onmouseout(target){
    this.state = "out";
    this.cd.markForCheck();
  }

  enterTasklist(ev:Event){
    ev.stopPropagation();
    this.selected.emit();
  }


}
