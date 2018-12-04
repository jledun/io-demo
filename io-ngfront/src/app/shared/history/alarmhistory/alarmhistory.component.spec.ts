import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmhistoryComponent } from './alarmhistory.component';

describe('AlarmhistoryComponent', () => {
  let component: AlarmhistoryComponent;
  let fixture: ComponentFixture<AlarmhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
