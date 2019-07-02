import { InjectionToken } from "@angular/core";

import { NgAuthServiceConfig } from "./dto/ng-auth-service-config.dto";

export namespace NgAuthKeys {
  export const NgAuthServiceConfig = new InjectionToken<NgAuthServiceConfig>(
    "tech.appstrax.auth.config"
  );
}
