import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { UserAddComponent } from '../user-management/user-add/user-add.component';
import { UserEditorComponent } from '../user-management/user-editor/user-editor.component';
import { UserEditorUserComponent } from '../user-management/user-editor-user/user-editor-user.component';

const routes: Routes = [
  {path: 'settings', component: SettingsComponent, children: [
    {path: "users", component: UserEditorComponent, outlet: 'settingsRouterOutlet'},
    {path: "users/:id", component: UserEditorUserComponent, outlet: 'settingsRouterOutlet'},
    {path: "profile/:id", component: UserEditorUserComponent, outlet: 'settingsRouterOutlet'},
    {path: "add-user", component: UserAddComponent, outlet: 'settingsRouterOutlet'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
