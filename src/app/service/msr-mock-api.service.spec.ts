import { TestBed } from '@angular/core/testing';

import { MsrMockApiService } from './msr-mock-api.service';

describe('MsrMockApiService', () => {
  let service: MsrMockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsrMockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
