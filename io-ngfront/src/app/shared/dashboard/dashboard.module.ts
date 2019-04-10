import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatCardModule, 
  MatDividerModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, 
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LibModule } from '../lib/lib.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExempleWebComponent } from './exemple-web/exemple-web.component';
import { ExempleFullscreenComponent } from './exemple-fullscreen/exemple-fullscreen.component';
import { ComponentComponent } from './component/component.component';

@NgModule({
  declarations: [
    ExempleWebComponent,
    ExempleFullscreenComponent,
    ComponentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    LibModule,
    DashboardRoutingModule,
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule, 
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ExempleWebComponent,
    ExempleFullscreenComponent
  ]
})
export class DashboardModule { }
