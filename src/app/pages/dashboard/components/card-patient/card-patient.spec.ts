import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPatient } from './card-patient';

describe('CardPatient', () => {
  let component: CardPatient;
  let fixture: ComponentFixture<CardPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
