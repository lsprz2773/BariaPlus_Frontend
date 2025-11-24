import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesRegister } from './notes-register';

describe('NotesRegister', () => {
  let component: NotesRegister;
  let fixture: ComponentFixture<NotesRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
