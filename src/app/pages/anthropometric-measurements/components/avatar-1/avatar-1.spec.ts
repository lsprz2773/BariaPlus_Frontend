import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Avatar1 } from './avatar-1';

describe('Avatar1', () => {
  let component: Avatar1;
  let fixture: ComponentFixture<Avatar1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Avatar1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Avatar1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
