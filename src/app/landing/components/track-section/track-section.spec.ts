import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSection } from './track-section';

describe('TrackSection', () => {
  let component: TrackSection;
  let fixture: ComponentFixture<TrackSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
