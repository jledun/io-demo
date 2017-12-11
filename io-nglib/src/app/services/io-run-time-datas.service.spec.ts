import { TestBed, inject } from '@angular/core/testing';

import { IoRunTimeDatasService } from './io-run-time-datas.service';

describe('IoRunTimeDatasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IoRunTimeDatasService]
    });
  });

  it('should be created', inject([IoRunTimeDatasService], (service: IoRunTimeDatasService) => {
    expect(service).toBeTruthy();
  }));
});
