import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenDashboardComponent } from './fullscreen-dashboard.component';

describe('FullscreenDashboardComponent', () => {
  let component: FullscreenDashboardComponent;
  let fixture: ComponentFixture<FullscreenDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullscreenDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
