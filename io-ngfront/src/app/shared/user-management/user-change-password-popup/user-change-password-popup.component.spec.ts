import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChangePasswordPopupComponent } from './user-change-password-popup.component';

describe('UserChangePasswordPopupComponent', () => {
  let component: UserChangePasswordPopupComponent;
  let fixture: ComponentFixture<UserChangePasswordPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserChangePasswordPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChangePasswordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
