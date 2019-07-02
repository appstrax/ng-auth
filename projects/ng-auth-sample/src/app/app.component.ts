import { Component } from "@angular/core";
import {
  NgAuthService,
  AuthResponse,
  AuthRequest,
  RegistrationResponse,
  RegistrationRequest
} from "@appstrax/ng-auth";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public registrationRequest: RegistrationRequest = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  public registrationResponse: RegistrationResponse = {
    token: ""
  };

  public authRequest: AuthRequest = {
    email: "",
    password: ""
  };
  public authResponse: AuthResponse = {
    token: ""
  };

  constructor(private ngAuth: NgAuthService) {}

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
}
