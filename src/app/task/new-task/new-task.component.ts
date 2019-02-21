import { Component, OnInit, Inject,ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {

  title="";
  form:FormGroup;

  priorities = [
    {
      value:1,
      label:"紧急"
    },
    {
      value:1,
      label:"重要"
    },
    {
      value:1,
      label:"普通"
    }
  ]

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private fb:FormBuilder,
    private dialogRef:MdDialogRef<NewTaskComponent>
    ) { 
     

    }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.task))
    this.form = this.fb.group({
      des:[this.data.task ? this.data.task.desc : "",Validators.required],
      priority:[this.data.task ? this.data.task.priority : "",Validators.required],
      owner:[this.data.task ? [this.data.task.owner] : [this.data.owner]],
      dueDate:[this.data.task ? this.data.task.dueDate : "",Validators.required],
      remainder:[this.data.task ? this.data.task.remainder : ""],
      followers:[this.data.task.participantIds ? [...this.data.task.participantIds] : []],
      remark:[this.data.task ? this.data.task.remark : ""]
    })

  }

  onSubmit(ev:Event,{value,valid}){
    ev.preventDefault();
    if(!valid) return
    this.dialogRef.close({
      ...value,
      ownerId:value.owner.length>0?value.owner[0].id:null,
      participantIds:value.followers.map(f=>f.id)
    })
  }

}
