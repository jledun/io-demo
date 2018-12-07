import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationCardComponent } from './user-creation-card.component';

describe('UserCreationCardComponent', () => {
  let component: UserCreationCardComponent;
  let fixture: ComponentFixture<UserCreationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
