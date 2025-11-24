import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNoteComponent } from './single-note';

describe('SingleNote', () => {
  let component: SingleNoteComponent;
  let fixture: ComponentFixture<SingleNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
