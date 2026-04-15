import { TestBed } from '@angular/core/testing';

import { ServiceRecordService } from './service-record.service';

describe('CarServiceRecordService', () => {
  let service: ServiceRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
