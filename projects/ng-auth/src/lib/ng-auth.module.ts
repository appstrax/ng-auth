import { NgModule, ModuleWithProviders } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { NgAuthKeys } from "./keys";
import { NgAuthServiceConfig } from "./dto/ng-auth-service-config.dto";
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
          provide: NgAuthKeys.NgAuthServiceConfig,
          useValue: config
        }
      ]
    };
  }
}
