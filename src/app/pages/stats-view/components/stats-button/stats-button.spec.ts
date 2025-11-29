import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsButton } from './stats-button';

describe('StatsButton', () => {
  let component: StatsButton;
  let fixture: ComponentFixture<StatsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
