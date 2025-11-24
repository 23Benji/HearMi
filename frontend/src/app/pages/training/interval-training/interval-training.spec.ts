import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTrainingComponent } from './interval-training';

describe('IntervalTraining', () => {
  let component: IntervalTrainingComponent;
  let fixture: ComponentFixture<IntervalTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
