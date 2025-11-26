import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsMenu } from './stats-menu';

describe('StatsMenu', () => {
  let component: StatsMenu;
  let fixture: ComponentFixture<StatsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
