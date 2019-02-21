import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  
  title="";
  form:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<NewTaskListComponent>,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      name:[this.data.list?this.data.list.name:'',Validators.compose([Validators.required])]
    })
  }
  
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return
    }
    this.dialogRef.close(value)
  }

}
