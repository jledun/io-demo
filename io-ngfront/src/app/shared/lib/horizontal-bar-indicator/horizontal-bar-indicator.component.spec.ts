import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarIndicatorComponent } from './horizontal-bar-indicator.component';

describe('HorizontalBarIndicatorComponent', () => {
  let component: HorizontalBarIndicatorComponent;
  let fixture: ComponentFixture<HorizontalBarIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalBarIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalBarIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
