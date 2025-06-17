import { TestBed } from '@angular/core/testing';

import { ReservationSService } from './reservation-s.service';

describe('ReservationSService', () => {
  let service: ReservationSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
