import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;
  themeChange(val:boolean){
    console.log(val);
    this.darkTheme = val ;
  }
}
