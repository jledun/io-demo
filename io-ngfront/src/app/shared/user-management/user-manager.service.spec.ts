import { TestBed } from '@angular/core/testing';

import { LbUserManagerService } from './lb-user-manager.service';

describe('LbUserManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LbUserManagerService = TestBed.get(LbUserManagerService);
    expect(service).toBeTruthy();
  });
});
