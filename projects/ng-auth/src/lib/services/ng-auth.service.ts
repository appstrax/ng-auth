import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { RegistrationRequest } from '../dto/registration-request.dto';
import { RegistrationResponse } from '../dto/registration-response.dto';
import { AuthRequest } from '../dto/auth-request.dto';
import { AuthResponse } from '../dto/auth-response.dto';
import { ForgotPasswordRequest } from '../dto/forgot-password-request.dto';
import { ForgotPasswordResponse } from '../dto/forgot-password-response.dto';
import { NgUser } from '../dto/ng-user.dto';
import { ResetPasswordRequest } from '../dto/reset-password-request.dto';
import { ResetPasswordResponse } from '../dto/reset-password-response.dto';
import { KeyValue } from '../dto/key-value.dto';

@Injectable()
export class NgAuthService {
  private user: NgUser;
  private token;
  private refreshTokenString;
  private checkTokenInterval;

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
    const token = this.storageService.getAuthToken();
    const refreshToken = this.storageService.getAuthRefreshToken();
    if (token) {
      this.initFromToken(token, refreshToken);
    }
  }

  private initFromToken(token: string, refreshToken: string) {
    if (!this.isTokenExpired(token)) {
      this.token = token;
      this.refreshTokenString = refreshToken;
      this.user = this.decode(token);
      this.storageService.setAuthToken(token);
      this.storageService.setAuthRefreshToken(refreshToken);
      if (!this.checkTokenInterval) {
        this.checkTokenInterval = setInterval(() => this.checkToken(), 60000);
      }
    } else {
      this.logout();
    }
  }

  private checkToken() {
    const secondsTimeNow = Math.trunc(new Date().getTime() / 1000);
    this.user.exp = this.user.exp + 10;
    if (this.user && this.user.exp < secondsTimeNow) {
      this.logout();
    }
    if (this.user && this.user.exp - 120000 < secondsTimeNow) {
      this.refreshToken(this.refreshTokenString);
    } else if (this.checkTokenInterval) {
      clearInterval(this.checkTokenInterval);
    }
  }

  public async register(registrationRequest: RegistrationRequest): Promise<NgUser> {
    const result: RegistrationResponse = await this.httpService.post(
      '/registration',
      registrationRequest
    );
    this.initFromToken(result.token, result.refreshToken);
    return this.user;
  }

  public async login(authRequest: AuthRequest): Promise<NgUser> {
    const response: AuthResponse = await this.httpService.post(
      '/auth',
      authRequest
    );
    this.initFromToken(response.token, response.refreshToken);
    return this.user;
  }

  private async refreshToken(token: string): Promise<void> {
    const header: KeyValue = {
      key: 'Authorization',
      value: token
    };

    try {
      const response: AuthResponse = await this.httpService.get(
        '/auth/refresh-token',
        [header]
      );
      this.initFromToken(response.token, response.refreshToken);
    } catch (error) {
      this.logout();
    }
  }

  public async forgotPassword(
    forgotPasswordRequest: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    const response: ForgotPasswordResponse = await this.httpService.post(
      '/auth-forgot-password-request-reset-token',
      forgotPasswordRequest
    );
    return response;
  }

  public async resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    const response: ResetPasswordResponse = await this.httpService.patch(
      '/auth-reset-password',
      resetPasswordRequest
    );
    return response;
  }

  public logout() {
    this.token = null;
    this.user = null;
    this.storageService.clearAuthToken();
    this.storageService.clearAuthRefreshToken();
    clearInterval(this.checkTokenInterval);
  }

  public isAuthenticated() {
    return this.token && !this.isTokenExpired(this.token)
      ? true
      : false;
  }

  public getAuthenticatedUser() {
    return this.user;
  }

  public getAuthToken() {
    return this.token;
  }

  private decode(token) {
    var parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT Token, expecting 3 parts');
    }
    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  private urlBase64Decode(str) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return (window as any).decodeURIComponent(escape((window as any).atob(output))); // TODO: Inject window from angular?
  }

  private getTokenExpirationDate(token) {
    var decoded = this.decode(token);

    if (typeof decoded.exp === 'undefined') {
      return null;
    }

    var d = new Date(0); // 0 as param sets the date to the epoch
    d.setUTCSeconds(decoded.exp);

    return d;
  }

  private isTokenExpired(token, offsetSeconds = 0) {
    var d = this.getTokenExpirationDate(token);
    if (!d) {
      return false;
    }

    return !(d.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
