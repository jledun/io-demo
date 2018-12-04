import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// local components
import { NomenclatureEditorComponent } from  './nomenclature-editor/nomenclature-editor.component';

const routes: Routes = [
  {path: 'recipe', component: NomenclatureEditorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclatureRoutingModule { }
