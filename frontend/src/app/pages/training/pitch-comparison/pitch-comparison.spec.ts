import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchComparison } from './pitch-comparison';

describe('PitchComparison', () => {
  let component: PitchComparison;
  let fixture: ComponentFixture<PitchComparison>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitchComparison]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitchComparison);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
