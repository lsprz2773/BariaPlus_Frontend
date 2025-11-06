import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTwo } from './part-two';

describe('PartTwo', () => {
  let component: PartTwo;
  let fixture: ComponentFixture<PartTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartTwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartTwo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
