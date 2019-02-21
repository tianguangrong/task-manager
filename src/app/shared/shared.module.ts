import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectiveModule } from '../directive/directive.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MdSidenavModule,
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdCardModule,
  MdListModule,
  MdSlideToggleModule,
  MdGridListModule,
  MdDialogModule,
  MdAutocompleteModule,
  MdMenuModule,
  MdCheckboxModule,
  MdTooltipModule,
  MdRadioModule,
  MdSelectModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdButtonToggleModule,
  MdChipsModule,
  MdTabsModule,
} from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    CommonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    HttpModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    DirectiveModule,
    ReactiveFormsModule, 
    FormsModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdTabsModule,
    //BrowserAnimationsModule,
  ],
  declarations: [
    ConfirmComponent, 
    ImageListSelectComponent, 
    AgeInputComponent, 
    ChipsListComponent, 
    IdentityInputComponent, 
    AreaListComponent
  ],
  exports: [
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    HttpModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdDialogModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdRadioModule,
    MdSelectModule,
    MdDatepickerModule,
    MdNativeDateModule,
    DirectiveModule,
    ReactiveFormsModule, 
    FormsModule,
    ImageListSelectComponent,
    CommonModule,
    MdButtonToggleModule,
    AgeInputComponent,
    MdChipsModule,
    ChipsListComponent,
    IdentityInputComponent, 
    AreaListComponent,
    MdTabsModule,
    //BrowserAnimationsModule,
  ],
  entryComponents:[
    ConfirmComponent
  ]
})
export class SharedModule { }
