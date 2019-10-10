import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { NgAuthModule } from "@appstrax/ng-auth";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgAuthModule.forRoot({
      apiKey: "xdeWnV8XeYPVbki4Kcm2pBVjKUwHoYNZkuzL0ju8"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
