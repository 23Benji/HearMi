import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chord-recognition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chord-recognition.html',
  styleUrl: './chord-recognition.scss'
})
export class ChordRecognitionComponent {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  chords = ['Major', 'Minor', 'Dominant 7', 'Sus4', 'Power Chord', 'Major 6', 'Minor 6'];
}
