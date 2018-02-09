import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IoRunTimeDatasService } from './shared/io-nglib';
import { SDKBrowserModule } from './shared/sdk/index';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SDKBrowserModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [ IoRunTimeDatasService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
