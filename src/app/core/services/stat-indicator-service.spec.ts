import { TestBed } from '@angular/core/testing';

import { StatIndicatorService } from './stat-indicator-service';

describe('StatIndicatorService', () => {
  let service: StatIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
