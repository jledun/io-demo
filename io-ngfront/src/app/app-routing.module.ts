import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

import { DashboardModule } from './shared/dashboard/dashboard.module';

const routes: Routes = [
  // { path: 'recipe', component: RecipeEditorComponent },
  { path: '', redirectTo: '/exemple-web', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
