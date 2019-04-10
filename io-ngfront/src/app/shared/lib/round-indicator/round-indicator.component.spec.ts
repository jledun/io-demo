import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundIndicatorComponent } from './round-indicator.component';

describe('RoundIndicatorComponent', () => {
  let component: RoundIndicatorComponent;
  let fixture: ComponentFixture<RoundIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
