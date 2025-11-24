import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometricMeasurements } from './anthropometric-measurements';

describe('AnthropometricMeasurements', () => {
  let component: AnthropometricMeasurements;
  let fixture: ComponentFixture<AnthropometricMeasurements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnthropometricMeasurements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnthropometricMeasurements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
