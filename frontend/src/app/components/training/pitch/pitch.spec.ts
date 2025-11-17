import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pitch } from './pitch';

describe('Pitch', () => {
  let component: Pitch;
  let fixture: ComponentFixture<Pitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pitch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
