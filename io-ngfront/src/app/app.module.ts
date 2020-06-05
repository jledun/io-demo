import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDKBrowserModule } from './shared/sdk/index';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

// main application
import { AppComponent } from './app.component';

// routing module
import { AppRoutingModule } from './app-routing.module';

// app components and app modules
import { TopbarComponent } from './topbar/topbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';

import { LibModule } from './shared/lib/lib.module';
import { SettingsModule } from './shared/settings/settings.module';
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
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,

    // Angular cdk
    ScrollDispatchModule,

    // Angular Flex Layout
    FlexLayoutModule,

    // local modules
    AppRoutingModule,
    LibModule,
    SettingsModule,
    UserManagementModule,
    DashboardModule,
    HistoryModule,
    MaterialModule,
    NomenclatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
