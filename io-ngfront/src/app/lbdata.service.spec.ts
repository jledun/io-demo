import { TestBed } from '@angular/core/testing';

import { LbdataService } from './lbdata.service';

describe('LbdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LbdataService = TestBed.get(LbdataService);
    expect(service).toBeTruthy();
  });
});
