import { TestBed } from '@angular/core/testing';

import { WebSoketImpService } from './web-soket-imp.service';

describe('WebSoketImpService', () => {
  let service: WebSoketImpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSoketImpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
