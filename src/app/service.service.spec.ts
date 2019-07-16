import { TestBed } from '@angular/core/testing';

import { TruthService } from './service.service';

describe('TruthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TruthService = TestBed.get(TruthService);
    expect(service).toBeTruthy();
  });
});
