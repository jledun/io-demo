import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// angular modules
import { 
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
  MatToolbarModule
} from '@angular/material';

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
