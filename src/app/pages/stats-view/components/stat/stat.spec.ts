import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stat } from './stat';

describe('Stat', () => {
  let component: Stat;
  let fixture: ComponentFixture<Stat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Stat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
