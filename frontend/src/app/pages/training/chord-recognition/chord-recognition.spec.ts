import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordRecognition } from './chord-recognition';

describe('ChordRecognition', () => {
  let component: ChordRecognition;
  let fixture: ComponentFixture<ChordRecognition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordRecognition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordRecognition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
