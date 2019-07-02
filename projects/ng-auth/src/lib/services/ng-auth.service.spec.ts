import { TestBed } from '@angular/core/testing';

import { NgAuthService } from './ng-auth.service';

describe('NgAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgAuthService = TestBed.get(NgAuthService);
    expect(service).toBeTruthy();
  });
});
