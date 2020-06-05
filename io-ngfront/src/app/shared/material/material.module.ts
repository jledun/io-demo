import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular modules
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

// local modules
import { MaterialRoutingModule } from './material-routing.module';
import { MaterialSelectorComponent } from './material-selector/material-selector.component';

@NgModule({
  declarations: [
    MaterialSelectorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule, 
    MatIconModule,
    MatSelectModule,
    MaterialRoutingModule
  ],
  exports: [
    MaterialSelectorComponent
  ]
})
export class MaterialModule { }
