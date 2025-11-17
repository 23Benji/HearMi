import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chord } from './chord';

describe('Chord', () => {
  let component: Chord;
  let fixture: ComponentFixture<Chord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
