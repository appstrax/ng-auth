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
      apiKey: "qmBDHjmlCOYIRWfXfhyrdAC90eauYHlooWNUjC1m"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
