import { TestBed } from '@angular/core/testing';

import { DocumentRecordService } from './document-record.service';

describe('DocumentService', () => {
  let service: DocumentRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
