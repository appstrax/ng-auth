import { StorageService } from './storage.service';
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { HttpService } from './http.service';
import { RegistrationRequest } from "../dto/registration-request.dto";
import { RegistrationResponse } from "../dto/registration-response.dto";
import { AuthRequest } from "../dto/auth-request.dto";
import { AuthResponse } from "../dto/auth-response.dto";

@Injectable()
export class NgAuthService {

  private user;
  private token;
  private jwtHelper = new JwtHelperService();

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
  ) {
    const token = this.storageService.getAuthToken();
    if (token) {
      this.initFromToken(token);
    }
  }

  private initFromToken(token: string) {
    if (!this.jwtHelper.isTokenExpired(token)) {
      this.token = token;
      this.user = this.jwtHelper.decodeToken(token);
      this.storageService.setAuthToken(token);
    } else {
      this.logout();
    }
  }

  public async register(registrationRequest: RegistrationRequest): Promise<RegistrationResponse> {
    const result: RegistrationResponse = await this.httpService.post("/registration", registrationRequest);
    this.initFromToken(result.token);
    return result;
  }

  public async login(authRequest: AuthRequest): Promise<AuthResponse> {
    const response: AuthResponse = await this.httpService.post("/auth", authRequest);
    this.initFromToken(response.token);
    return response;
  }

  public logout() {
    this.token = null;
    this.user = null;
    this.storageService.clearAuthToken();
  }

  public isAuthenticated() {
    return (this.token && !this.jwtHelper.isTokenExpired(this.token)) ? true : false;
  }

  public getAuthenticatedUser() {
    return this.user;
  }

  public getAuthToken() {
    return this.token;
  }
}
