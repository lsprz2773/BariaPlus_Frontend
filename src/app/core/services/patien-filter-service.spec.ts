import { TestBed } from '@angular/core/testing';

import { PatienFilterService } from './patien-filter-service';

describe('PatienFilterService', () => {
  let service: PatienFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatienFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
