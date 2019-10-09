import { TestBed } from "@angular/core/testing";

import { NgAuthService } from "./ng-auth.service";
import { NgAuthModule } from "../ng-auth.module";

describe("NgAuthService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        NgAuthModule.forRoot({
          apiKey: "Test-Key"
        })
      ]
    })
  );

  it("should be created", () => {
    const service: NgAuthService = TestBed.get(NgAuthService);
    expect(service).toBeTruthy();
  });
});
