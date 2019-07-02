import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { NgAuthKeys } from "../keys";
import { NgAuthServiceConfig } from "../dto/ng-auth-service-config.dto";
import { RegistrationRequest } from "../dto/registration-request.dto";
import { RegistrationResponse } from "../dto/registration-response.dto";
import { AuthRequest } from "../dto/auth-request.dto";
import { AuthResponse } from "../dto/auth-response.dto";

@Injectable({
  providedIn: "root"
})
export class NgAuthService {
  // Default, otherwise overwritten from config
  private baseUrl: string = "https://appstrax-auth-api-qa.herokuapp.com";

  constructor(
    @Inject(NgAuthKeys.NgAuthServiceConfig) private config: NgAuthServiceConfig,
    private httpClient: HttpClient
  ) {
    if (this.config.baseUrl) {
      this.baseUrl = this.config.baseUrl;
    }
  }

  public async register(
    registrationRequest: RegistrationRequest
  ): Promise<RegistrationResponse> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          this.baseUrl + "/registration?app_id=" + this.config.applicationId,
          registrationRequest
        )
        .subscribe(
          (response: RegistrationResponse) => {
            resolve(response);
          },
          err => reject(err)
        );
    });
  }

  public async login(authRequest: AuthRequest): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(
          this.baseUrl + "/auth?app_id=" + this.config.applicationId,
          authRequest
        )
        .subscribe(
          (response: AuthResponse) => {
            resolve(response);
          },
          err => reject(err)
        );
    });
  }
}
