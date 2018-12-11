import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorUsersComponent } from './user-editor-users.component';

describe('UserEditorUsersComponent', () => {
  let component: UserEditorUsersComponent;
  let fixture: ComponentFixture<UserEditorUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditorUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
