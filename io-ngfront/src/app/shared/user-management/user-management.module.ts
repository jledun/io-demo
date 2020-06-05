import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LibModule } from '../lib/lib.module';

import { UserConnectionComponent } from './user-connection/user-connection.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserTopbarComponent } from './user-topbar/user-topbar.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserCreationCardComponent } from './user-creation-card/user-creation-card.component';
import { UserEditorUsersComponent } from './user-editor-users/user-editor-users.component';
import { UserEditorRightsComponent } from './user-editor-rights/user-editor-rights.component';
import { UserEditorUserComponent } from './user-editor-user/user-editor-user.component';
import { UserCheckIdentityComponent } from './user-check-identity/user-check-identity.component';
import { UserChangePasswordPopupComponent } from './user-change-password-popup/user-change-password-popup.component';
import { UserDeletePopupComponent } from './user-delete-popup/user-delete-popup.component';
import { UserAddComponent } from './user-add/user-add.component';

@NgModule({
  declarations: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent,
    UserCreationCardComponent,
    UserEditorUsersComponent,
    UserEditorRightsComponent,
    UserEditorUserComponent,
    UserCheckIdentityComponent,
    UserChangePasswordPopupComponent,
    UserDeletePopupComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserManagementRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    LibModule
  ],
  exports: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent,
    UserEditorUsersComponent,
    UserEditorRightsComponent,
    UserEditorUserComponent,
    UserChangePasswordPopupComponent,
    UserDeletePopupComponent,
    UserAddComponent
  ],
  entryComponents: [
    UserConnectionComponent,
    UserChangePasswordPopupComponent,
    UserDeletePopupComponent
  ]
})
export class UserManagementModule { }
