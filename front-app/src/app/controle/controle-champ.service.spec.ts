import { TestBed } from '@angular/core/testing';

import { ControleChampService } from './controle-champ.service';

describe('ControleChampService', () => {
  let service: ControleChampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleChampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
