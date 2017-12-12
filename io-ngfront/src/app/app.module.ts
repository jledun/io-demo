import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IoRunTimeDatasService } from './shared/io-nglib';
import { SDKBrowserModule } from './shared/sdk/index';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [ IoRunTimeDatasService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
