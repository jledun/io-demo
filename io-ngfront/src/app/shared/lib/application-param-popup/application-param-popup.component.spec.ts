import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationParamPopupComponent } from './application-param-popup.component';

describe('ApplicationParamPopupComponent', () => {
  let component: ApplicationParamPopupComponent;
  let fixture: ComponentFixture<ApplicationParamPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationParamPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationParamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
