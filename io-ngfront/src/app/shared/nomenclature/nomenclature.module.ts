import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// angular modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

// local modules
import { MaterialModule } from '../material/material.module';
import { NomenclatureRoutingModule } from './nomenclature-routing.module';
import { NomenclatureEditorComponent } from  './nomenclature-editor/nomenclature-editor.component';

@NgModule({
  declarations: [
    NomenclatureEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatCardModule, 
    MatDividerModule,
    MatFormFieldModule, 
    MatIconModule,
    MatListModule,
    MatMenuModule, 
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,

    MaterialModule,
    NomenclatureRoutingModule
  ],
  exports: [
    NomenclatureEditorComponent
  ]
})
export class NomenclatureModule { }
