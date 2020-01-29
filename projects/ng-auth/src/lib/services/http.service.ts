import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NG_AUTH_SERVICE_CONFIG_TOKEN } from '../tokens';
import { NgAuthServiceConfig } from '../ng-auth-service-config';

@Injectable()
export class HttpService {

  // default, otherwise overwritten from config
  private baseUrl = 'https://api.appstrax.tech/auth/v1';
  private headers;

  constructor(
    @Inject(NG_AUTH_SERVICE_CONFIG_TOKEN) private config: NgAuthServiceConfig,
    private httpClient: HttpClient
  ) {
    if (this.config.baseUrl) {
      this.baseUrl = this.config.baseUrl;
    }

    this.headers = {
      headers: { 'X-Api-Key': this.config.apiKey }
    };
  }

  public post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseUrl + url, body, this.headers).subscribe((response) => resolve(response), (err) => reject(err));
    });
  }

  public get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseUrl + url, this.headers).subscribe((response) => resolve(response), (err) => reject(err));
    });
  }
}
