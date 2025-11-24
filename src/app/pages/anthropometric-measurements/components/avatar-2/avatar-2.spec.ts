import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Avatar2 } from './avatar-2';

describe('Avatar2', () => {
  let component: Avatar2;
  let fixture: ComponentFixture<Avatar2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Avatar2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Avatar2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
