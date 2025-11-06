import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartOne } from './part-one';

describe('PartOne', () => {
  let component: PartOne;
  let fixture: ComponentFixture<PartOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
