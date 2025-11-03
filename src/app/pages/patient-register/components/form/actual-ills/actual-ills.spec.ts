import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualIlls } from './actual-ills';

describe('ActualIlls', () => {
  let component: ActualIlls;
  let fixture: ComponentFixture<ActualIlls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualIlls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualIlls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
