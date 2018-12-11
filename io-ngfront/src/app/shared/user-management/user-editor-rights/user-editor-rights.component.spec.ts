import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorRightsComponent } from './user-editor-rights.component';

describe('UserEditorRightsComponent', () => {
  let component: UserEditorRightsComponent;
  let fixture: ComponentFixture<UserEditorRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditorRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
