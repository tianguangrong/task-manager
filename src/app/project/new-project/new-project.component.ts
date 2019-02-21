import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  title="";
  form:FormGroup;
  coverImages = [];

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<NewProjectComponent>,
    private cd:ChangeDetectorRef,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if(this.data.project){
      this.title = '修改项目';
      this.form = this.fb.group({
        name:[this.data.project.name,Validators.compose([Validators.required])],
        desc:[this.data.project.desc ],
        coverImg:[this.data.project.coverImg]
      })
    }else{
      this.title = '创建项目';
    this.form = this.fb.group({
      name:['',Validators.compose([Validators.required])],
      desc:[''],
      coverImg:[this.data.img]
    })
    }
    
  }
  onSubmit({value,valid},event:Event){
    if(!valid) return;
    this.dialogRef.close(value);
    this.cd.markForCheck();
  }

}
