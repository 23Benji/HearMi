import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-note.html',
  styleUrl: './single-note.scss'
})
export class SingleNoteComponent {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
}
