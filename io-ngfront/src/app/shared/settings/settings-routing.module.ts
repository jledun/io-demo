import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UserEditorComponent } from '../user-management/user-editor/user-editor.component';

const routes: Routes = [
  {path: 'settings', component: SettingsComponent, children: [
    {path: "users", component: UserEditorComponent, outlet: 'settingsRouterOutlet'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
