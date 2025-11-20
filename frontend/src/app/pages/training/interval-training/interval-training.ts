import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interval-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interval-training.html',
  styleUrl: './interval-training.scss'
})
export class IntervalTrainingComponent {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  intervals = ['Unison', 'm2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave'];
}
