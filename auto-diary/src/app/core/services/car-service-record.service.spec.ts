import { TestBed } from '@angular/core/testing';

import { CarServiceRecordService } from './car-service-record.service';

describe('CarServiceRecordService', () => {
  let service: CarServiceRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarServiceRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
