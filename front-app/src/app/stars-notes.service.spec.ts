import { TestBed } from '@angular/core/testing';

import { StarsNotesService } from './stars-notes.service';

describe('StarsNotesService', () => {
  let service: StarsNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarsNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
