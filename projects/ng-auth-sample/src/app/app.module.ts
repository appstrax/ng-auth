import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgAuthModule } from "@appstrax/ng-auth";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NgAuthModule.forRoot({
      applicationId: "056d4043-ac22-7de1-ec5f-06318f0acac3"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
