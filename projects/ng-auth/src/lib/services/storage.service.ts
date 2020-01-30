import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  private authTokenKey = 'APPSTRAX_AUTH_TOKEN';
  private refreshToken = 'APPSTRAX_REFRESH_AUTH_TOKEN';

  constructor() {}

  public getAuthToken(): string {
    return localStorage.getItem(this.authTokenKey);
  }

  public setAuthToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  public clearAuthToken() {
    localStorage.removeItem(this.authTokenKey);
  }

  public getAuthRefreshToken(): string {
    return localStorage.getItem(this.refreshToken);
  }

  public setAuthRefreshToken(token: string) {
    localStorage.setItem(this.authTokenKey, token);
  }

  public clearAuthRefreshToken() {
    localStorage.removeItem(this.authTokenKey);
  }
}
