import { TestBed } from '@angular/core/testing';

import { ConsultationStateService } from './consultation-state-service';

describe('ConsultationStateService', () => {
  let service: ConsultationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
