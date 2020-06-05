import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
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
