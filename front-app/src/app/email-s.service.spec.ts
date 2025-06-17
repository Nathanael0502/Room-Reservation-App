import { TestBed } from '@angular/core/testing';

import { EmailSService } from './email-s.service';

describe('EmailSService', () => {
  let service: EmailSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
