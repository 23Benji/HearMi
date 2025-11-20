import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNote } from './single-note';

describe('SingleNote', () => {
  let component: SingleNote;
  let fixture: ComponentFixture<SingleNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
