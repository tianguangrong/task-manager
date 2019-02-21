import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {

  lists;
  form:FormGroup

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<CopyTaskComponent>,
    private fb:FormBuilder
    ) { }

  ngOnInit() {
    //console.log(this.data.lists);
    this.lists = this.data.lists;
    this.form = this.fb.group({
      targetListId:[]
    })
  }

  onSubmit(ev:Event,{value,valid}){
    if(!valid) return;
    this.dialogRef.close(value.targetListId)
  }

}
