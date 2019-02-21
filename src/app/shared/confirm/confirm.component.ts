import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  template: `
    <h4 md-dialog-title>{{title}}</h4>
    <div md-dialog-content>
    {{content}}
    </div>
    <div md-dialog-actions>
      <button  type="button" md-raised-button color="accent" md-dialog-close (click)="save(true)">是</button>
      <button type="button" md-button md-dialog-close (click)="save(false)">否</button>
    </div>
  `,
  styles: []
})
export class ConfirmComponent implements OnInit {
  title="";
  content="";

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<ConfirmComponent>
  ) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }
  
  save(boolean:Boolean){
    this.dialogRef.close(boolean);
  }

}
