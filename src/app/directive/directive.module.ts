import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDragDirective } from './drag-drop/app-drag.directive';
import { AppDropDirective } from './drag-drop/app-drop.directive';
import { DragDropService } from './drag-drop.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppDragDirective, 
    AppDropDirective
  ],
  exports:[
    AppDragDirective, 
    AppDropDirective,
  ]
})
export class DirectiveModule { }
