import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordRecognitionComponent } from './chord-recognition';

describe('ChordRecognition', () => {
  let component: ChordRecognitionComponent;
  let fixture: ComponentFixture<ChordRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordRecognitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
