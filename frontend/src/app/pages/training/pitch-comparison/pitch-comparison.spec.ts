import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchComparisonComponent } from './pitch-comparison';

describe('PitchComparison', () => {
  let component: PitchComparisonComponent;
  let fixture: ComponentFixture<PitchComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PitchComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitchComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
