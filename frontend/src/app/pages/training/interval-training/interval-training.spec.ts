import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTraining } from './interval-training';

describe('IntervalTraining', () => {
  let component: IntervalTraining;
  let fixture: ComponentFixture<IntervalTraining>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTraining]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervalTraining);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
