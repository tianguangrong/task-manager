import { Directive, Input, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
import { DragDropService, dragData } from '../drag-drop.service';
import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[app-droppable][dragenterClass][dropTags]'
})
export class AppDropDirective {

  @Input() dragenterClass;
  @Input() dropTags:Array<string>=[];
  @Output() dropped = new EventEmitter<dragData>();
  private data$;

  constructor(private el:ElementRef, private rd:Renderer2,private service:DragDropService) {
    this.data$ = this.service.getDragData().take(1);
   }

  @HostListener("dragenter",["$event"])
  onDragenter(target:Event){
    target.preventDefault();//阻止默认事件；
    target.stopPropagation();//阻止事件冒泡
    if(this.el.nativeElement === target.target){//如果移动的目标是指令应用的目标的话
      this.data$.subscribe((d) =>{//订阅该流；
        console.log("d :"+d.tag);
        if(this.dropTags.indexOf(d.tag) > -1){//如果流里面的tag存在在dragTags里面，则表示允许拖放在该出
          this.rd.addClass(this.el.nativeElement,this.dragenterClass)//添加拖放的背景；
        }
      })
      
    }
  }

  @HostListener("dragleave",["$event"])
  onDragleave(target){
    target.preventDefault();//阻止默认事件；
    target.stopPropagation();//阻止事件冒泡
    if(this.el.nativeElement === target.target){//如果移动的目标是指令应用的目标的话
      this.data$.subscribe((d) =>{//订阅该流；
        if(this.dropTags.indexOf(d.tag) > -1){//如果流里面的tag存在在dragTags里面，则表示允许拖放在该出
          this.rd.removeClass(this.el.nativeElement,this.dragenterClass)//添加拖放的背景；
        }
      })
      
    }
  }

  @HostListener("drop",["$event"])
  onDrop(target){
    target.preventDefault();//阻止默认事件；
    target.stopPropagation();//阻止事件冒泡
    if(this.el.nativeElement === target.target){//如果移动的目标是指令应用的目标的话
      this.data$.subscribe((d) =>{//订阅该流；
        if(this.dropTags.indexOf(d.tag) > -1){//如果流里面的tag存在在dragTags里面，则表示允许拖放在该出
          this.rd.removeClass(this.el.nativeElement,this.dragenterClass)//添加拖放的背景；
          this.dropped.emit(d);
          this.service.clearDragData();
        }
      })
      
    }
  }

  @HostListener("dragover",["$event"])
  onDragover(target){
    target.preventDefault();//阻止默认事件；
    target.stopPropagation();//阻止事件冒泡
    if(this.el.nativeElement === target.target){
      this.data$.subscribe((d)=>{
        if(this.dropTags.indexOf(d.tag) > -1){
          this.rd.setProperty(target,"dataTransfer.effectAllowed","all");
          this.rd.setProperty(target,'dataTransfer.dropEffect','move');
        }else{
          this.rd.setProperty(target,"dataTransfer.effectAllowed","none");
          this.rd.setProperty(target,'dataTransfer.dropEffect','none');
        }
      })
    }
  }


}
