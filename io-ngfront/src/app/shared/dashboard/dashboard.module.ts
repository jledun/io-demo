import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatCardModule, 
  MatDividerModule,
  MatIconModule,
  MatInputModule, 
  MatListModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ExempleWebComponent } from './exemple-web/exemple-web.component';
import { ExempleFullscreenComponent } from './exemple-fullscreen/exemple-fullscreen.component';

@NgModule({
  declarations: [
    ExempleWebComponent,
    ExempleFullscreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatButtonModule, 
    MatCardModule, 
    MatDividerModule,
    MatIconModule,
    MatInputModule, 
    MatListModule
  ],
  exports: [
    ExempleWebComponent,
    ExempleFullscreenComponent
  ]
})
export class DashboardModule { }
