import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalInfo } from './profesional-info';

describe('ProfesionalInfo', () => {
  let component: ProfesionalInfo;
  let fixture: ComponentFixture<ProfesionalInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesionalInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesionalInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
