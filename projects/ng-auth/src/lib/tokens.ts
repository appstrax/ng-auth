import { InjectionToken } from "@angular/core";

import { NgAuthServiceConfig } from "./ng-auth-service-config";

export const NG_AUTH_SERVICE_CONFIG_TOKEN = new InjectionToken<NgAuthServiceConfig>(
  "tech.appstrax.auth.config"
);
