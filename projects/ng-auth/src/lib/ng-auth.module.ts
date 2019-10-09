import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NG_AUTH_SERVICE_CONFIG_TOKEN } from "./tokens";
import { NgAuthServiceConfig } from "./ng-auth-service-config";
import { NgAuthService } from "./services/ng-auth.service";

@NgModule({
  imports: [HttpClientModule]
})
export class NgAuthModule {
  static forRoot(config: NgAuthServiceConfig): ModuleWithProviders {
    return {
      ngModule: NgAuthModule,
      providers: [
        NgAuthService,
        {
          provide: NG_AUTH_SERVICE_CONFIG_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
