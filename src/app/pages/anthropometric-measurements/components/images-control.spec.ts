import { TestBed } from '@angular/core/testing';

import { ImagesControl } from './images-control';

describe('ImagesControl', () => {
  let service: ImagesControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
