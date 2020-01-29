import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NgAuthModule } from './ng-auth.module';
import { NG_AUTH_SERVICE_CONFIG_TOKEN } from './tokens';
import { NgAuthServiceConfig } from './ng-auth-service-config';

describe('NgAuthModule', () => {
  describe('forRoot', () => {
    it('should provide NgAuthModule with config and http client', () => {
      const apiKey = 'TEST-KEY';
      const baseUrl = 'http://auth.api.appstrax.tech/v1';

      TestBed.configureTestingModule({
        imports: [NgAuthModule.forRoot({ apiKey, baseUrl })]
      });

      const config = TestBed.get(NG_AUTH_SERVICE_CONFIG_TOKEN) as NgAuthServiceConfig;
      expect(config).toBeTruthy();
      expect(config.apiKey).toBe(apiKey);
      expect(config.baseUrl).toBe(baseUrl);

      const httpClient = TestBed.get(HttpClient);
      expect(httpClient instanceof HttpClient).toBeTruthy();
    });
  });
});
