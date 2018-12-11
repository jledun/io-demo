import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationParamComponent } from './application-param.component';

describe('ApplicationParamComponent', () => {
  let component: ApplicationParamComponent;
  let fixture: ComponentFixture<ApplicationParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
