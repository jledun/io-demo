import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorUserComponent } from './user-editor-user.component';

describe('UserEditorUserComponent', () => {
  let component: UserEditorUserComponent;
  let fixture: ComponentFixture<UserEditorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
