import { Component } from '@angular/core';
import {
  NgAuthService,
  AuthResponse,
  AuthRequest,
  RegistrationResponse,
  RegistrationRequest
} from '@appstrax/ng-auth';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public registrationRequest: RegistrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  public registrationResponse: RegistrationResponse = {
    token: ''
  };

  public authRequest: AuthRequest = {
    email: '',
    password: ''
  };
  public authResponse: AuthResponse = {
    token: '',
    refreshToken: ''
  };

  constructor(private ngAuth: NgAuthService) { }

  async login() {
    try {
      this.authResponse = await this.ngAuth.login(this.authRequest);
    } catch (err) {
      // The HTTP Error Response
      // TODO: Alert
    }
  }

  async register() {
    try {
      this.registrationResponse = await this.ngAuth.register(
        this.registrationRequest
      );
    } catch (err) {
      // The HTTP Error Response
      // TODO: Alert
    }
  }

  isAuthenticated() {
    return this.ngAuth.isAuthenticated();
  }

  getAuthToken() {
    return this.ngAuth.getAuthToken();
  }

  getUser() {
    return JSON.stringify(this.ngAuth.getAuthenticatedUser());
  }

  logout() {
    return this.ngAuth.logout();
  }
}
