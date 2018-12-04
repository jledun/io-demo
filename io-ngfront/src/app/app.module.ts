import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule, 
  MatButtonToggleModule,
  MatCardModule, 
  MatCheckboxModule, 
  MatCommonModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule, 
  MatGridListModule,
  MatIconModule,
  MatInputModule, 
  MatListModule,
  MatMenuModule, 
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule, 
  MatSelectModule, 
  MatSidenavModule,
  MatSliderModule, 
  MatSlideToggleModule,
  MatSnackBarModule, MatSnackBar,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ChartsModule } from 'ng2-charts';

// main application
import { AppComponent } from './app.component';

// routing module
import { AppRoutingModule } from './app-routing.module';

// app components and app modules
import { TopbarComponent } from './topbar/topbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';

import { LibModule } from './shared/lib/lib.module';
import { UserManagementModule } from './shared/user-management/user-management.module';
import { DashboardModule } from './shared/dashboard/dashboard.module';
import { HistoryModule } from './shared/history/history.module';
import { MaterialModule } from './shared/material/material.module';
import { NomenclatureModule } from './shared/nomenclature/nomenclature.module';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    BottombarComponent
  ],
  imports: [
    // angular
    FormsModule,
    BrowserModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,

    // Angular Material
    MatButtonModule, 
    MatButtonToggleModule,
    MatCardModule, 
    MatCheckboxModule, 
    MatCommonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule, 
    MatGridListModule,
    MatIconModule,
    MatInputModule, 
    MatListModule,
    MatMenuModule, 
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule, 
    MatSelectModule, 
    MatSidenavModule,
    MatSliderModule, 
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,

    // Angular cdk
    LayoutModule,
    ScrollDispatchModule,

    // charts
    ChartsModule,

    // local modules
    AppRoutingModule,
    LibModule,
    UserManagementModule,
    DashboardModule,
    HistoryModule,
    MaterialModule,
    NomenclatureModule
  ],
  providers: [ MatSnackBar ],
  bootstrap: [AppComponent]
})
export class AppModule { }
