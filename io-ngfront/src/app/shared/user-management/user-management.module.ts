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
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';

import { UserConnectionComponent } from './user-connection/user-connection.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserTopbarComponent } from './user-topbar/user-topbar.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserCreationCardComponent } from './user-creation-card/user-creation-card.component';

@NgModule({
  declarations: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent,
    UserCreationCardComponent
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
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [
    UserConnectionComponent,
    UserCreationComponent,
    UserTopbarComponent,
    UserEditorComponent
  ],
  entryComponents: [UserConnectionComponent]
})
export class UserManagementModule { }
