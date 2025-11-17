import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTest } from './token-test';

describe('TokenTest', () => {
  let component: TokenTest;
  let fixture: ComponentFixture<TokenTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
