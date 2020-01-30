import { Component } from '@angular/core';
import {
  NgAuthService,
  NgUser,
  AuthRequest,
  RegistrationResponse,
  RegistrationRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
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
    token: '',
    refreshToken: '',
  };

  public authRequest: AuthRequest = {
    email: '',
    password: ''
  };

  public forgotPasswordRequest: ForgotPasswordRequest = {
    email: ''
  };

  public forgotPasswordResponse: ForgotPasswordResponse = {
    resetMessage: ''
  };

  public resetPasswordRequest: ResetPasswordRequest = {
    email: '',
    resetCode: '',
    newPassword: ''
  };

  public resetPasswordResponse: ResetPasswordResponse = {
    resetMessage: ''
  };

  public authResponse: NgUser = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    iat: 0,
    exp: 0
  };

  constructor(private ngAuth: NgAuthService) {}

  async login() {
    try {
      this.authResponse = await this.ngAuth.login(this.authRequest);
      console.log(this.ngAuth.getAuthenticatedUser());
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

  async forgotPassword() {
    try {
      this.forgotPasswordResponse = await this.ngAuth.forgotPassword(
        this.forgotPasswordRequest
      );
    } catch (err) {}
  }

  async resetPassword() {
    try {
      this.forgotPasswordResponse = await this.ngAuth.resetPassword(
        this.resetPasswordRequest
      );
    } catch (err) {}
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
