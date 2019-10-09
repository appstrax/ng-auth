# @appstrax/ng-auth

This library contains a simple service, which allows you to easily integrate authentication into your applications.

## Getting Started

Create your AppStrax Application (API Key) here: https://appstrax.tech.

You can use this test API Key: `xdeWnV8XeYPVbki4Kcm2pBVjKUwHoYNZkuzL0ju8` (not recommended for production).

## Installation

```bash
npm install @appstrax/ng-auth --save
```

## Setup

In your `app.module.ts` file:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import the NgAuthModule
import { NgAuthModule } from '@appstrax/ng-auth';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Configure it with your Application ID
    NgAuthModule.forRoot({
      apiKey: "YOUR-API-KEY"
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In your `component`, inject the NgAuthService:

```javascript
export class Component {

  constructor(
    // Other injectables...

    // Inject the NgAuthService
    private ngAuth: NgAuthService

  ) {}

}
```

## Registration

```javascript
export class AppComponent {
  public registrationRequest: RegistrationRequest = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  public registrationResponse: RegistrationResponse = {
    token: "",
    refreshToken
  };

  constructor(private ngAuth: NgAuthService) {}

  async register() {
    try {
      this.registrationResponse = await this.ngAuth.register(
        this.registrationRequest
      );

      // The JWT Token
      console.log(this.registrationResponse);
    } catch (err) {
      // The HTTP Error Response
    }
  }
}
```

## Login

```javascript
export class AppComponent {
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

      // The JWT token
      console.log(this.authResponse);
    } catch (err) {
      // The HTTP Error Response
    }
  }
}
```

# Development and Testing

You can run tests in the package by running `ng test` in the `./projects/ng-auth` folder.

# Publishing

```
npm run package
npm publish ./dist/ng-auth/appstrax-ng-auth-1.0.0.tgz
```