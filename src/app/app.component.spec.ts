import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MdSidenavModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[
        MdSidenavModule,
        RouterModule.forRoot([]),
        CoreModule
      ],
      providers:[
        {
          provider:APP_BASE_HREF,
          useValue:'/'
        }
      ]
    }).compileComponents();
  }));

  it('应该创建应用', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


  it('包含一个.site元素', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.site')).toBeTruthy();
  }));
});
