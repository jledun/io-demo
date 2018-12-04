import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclatureEditorComponent } from './recipe-editor.component';

describe('NomenclatureEditorComponent', () => {
  let component: NomenclatureEditorComponent;
  let fixture: ComponentFixture<NomenclatureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomenclatureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
