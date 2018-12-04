import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular modules
import { 
  MatButtonModule,  
  MatDividerModule,
  MatFormFieldModule, 
  MatIconModule,
  MatSelectModule
} from '@angular/material';

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
