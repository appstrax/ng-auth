import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";

import { NgAuthModule } from "./ng-auth.module";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "host-comp",
  template: ``
})
class HostComponent {}

describe("NgAuthModule", () => {
  describe("forRoot", () => {
    it("should provide NgAuthModule", () => {
      TestBed.configureTestingModule({
        imports: [NgAuthModule]
      });

      const httpClient = TestBed.get(HttpClient);

      expect(httpClient instanceof HttpClient).toBeTruthy();
    });
  });
});
