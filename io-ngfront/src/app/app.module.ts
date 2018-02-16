import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IoRunTimeDatasService } from './shared/io-nglib';
import { SDKBrowserModule } from './shared/sdk/index';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, 
  MatToolbarModule, 
  MatIconModule, 
  MatMenuModule, 
  MatButtonModule, 
  MatButtonToggleModule,
  MatTableModule,
  MatGridListModule,
  MatProgressBarModule,
  MatDividerModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatCheckboxModule, 
  MatSelectModule, 
  MatSliderModule, 
  MatRadioModule, 
  MatSlideToggleModule, 
  MatCardModule,
  MatNativeDateModule, 
  MatCommonModule,
  MatProgressSpinnerModule,
  MatDatepickerModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { EventhistoryComponent } from './eventhistory/eventhistory.component';
import { AlarmhistoryComponent } from './alarmhistory/alarmhistory.component';
import { ProcesshistoryComponent } from './processhistory/processhistory.component';
import { TopbarComponent } from './topbar/topbar.component';
import { BottombarComponent } from './bottombar/bottombar.component';

const appRoutes: Routes = [
  { path: 'eventhistory', component: EventhistoryComponent },
  { path: 'alarmhistory', component: AlarmhistoryComponent },
  { path: 'processhistory', component: ProcesshistoryComponent },
  { path: '**', component: EventhistoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EventhistoryComponent,
    AlarmhistoryComponent,
    ProcesshistoryComponent,
    TopbarComponent,
    BottombarComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    FormsModule,
    BrowserModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule, 
    MatButtonModule, 
    MatButtonToggleModule,
    MatTableModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDividerModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatSelectModule, 
    MatSliderModule, 
    MatRadioModule, 
    MatSlideToggleModule,
    MatCardModule, 
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCommonModule,
    LayoutModule,
    ScrollDispatchModule,
    ChartsModule
  ],
  providers: [ IoRunTimeDatasService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
