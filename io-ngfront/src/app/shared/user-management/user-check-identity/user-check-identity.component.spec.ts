import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckIdentityComponent } from './user-check-identity.component';

describe('UserCheckIdentityComponent', () => {
  let component: UserCheckIdentityComponent;
  let fixture: ComponentFixture<UserCheckIdentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCheckIdentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
