import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserManagementRoutingModule } from './user-management-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { 
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatListModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
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
    UserCheckIdentityComponent
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
    UserEditorUserComponent
  ],
  entryComponents: [UserConnectionComponent]
})
export class UserManagementModule { }
