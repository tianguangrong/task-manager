import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MdIconRegistry} from '@angular/material';
import { DomSanitizer } from "@angular/platform-browser";
import { svgIconExpression } from "../utils/svg.util";
import { AppRoutingModule } from '../app-routing.module';
import { AppStoreModule } from '../reducers';
import { AppEffectsModule } from '../effects';
import '../utils/debug.util';
import '../utils/debug.util';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    AppStoreModule,
    AppEffectsModule
  ],
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidebarComponent
  ],
  exports:[
    FooterComponent,
    HeaderComponent, 
    SidebarComponent,
    AppRoutingModule,
    AppStoreModule,
    AppEffectsModule
  ]
})
export class CoreModule { 

  constructor(
    @Optional() 
    @SkipSelf() 
    public parent:CoreModule,
    ir:MdIconRegistry,
    ds:DomSanitizer
  ){

    if(parent){
      throw Error('此模块只允许加载一次，不可重复加载！')
    }
    svgIconExpression(ir,ds);
}
}
