import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[app-draggbale][draggClass][dragTag][dragData]'
})
export class AppDragDirective {

  dragBoolean:Boolean = false;

  @Input() draggClass;
  @Input() dragTag:string;
  @Input() dragData:any;

  @Input('app-draggbale') 
  set isDraggable(val:Boolean){
    this.dragBoolean = val ;
    this.rd.setAttribute(this.el.nativeElement,"draggable",`${this.dragBoolean}`);
  }

  get isDraggable(){
    return this.dragBoolean ;
  }

  constructor(
    private el:ElementRef,
    private rd:Renderer2,
    private service:DragDropService
  ) { }

  @HostListener("dragstart",["$event"])
  onDragstart(target){
    if(this.el.nativeElement === target.target){
      this.rd.addClass(this.el.nativeElement,this.draggClass);
      this.service.setDragData({tag:this.dragTag,data:this.dragData});
      console.log(this.dragTag);
    }
  }

  @HostListener("dragover",["$event"])
  ondragover(target){
    if(this.el.nativeElement === target.target){
      this.rd.removeClass(this.el.nativeElement,this.draggClass);
    }
  }
  @HostListener("dragleave",["$event"])
  ondragleave(target){
    if(this.el.nativeElement === target.target){
      this.rd.removeClass(this.el.nativeElement,this.draggClass);
    }
  }

}
