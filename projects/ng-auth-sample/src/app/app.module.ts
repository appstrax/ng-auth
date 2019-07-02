import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgAuthModule } from '@appstrax/ng-auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
