import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pitch-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pitch-comparison.html',
  styleUrl: './pitch-comparison.scss'
})
export class PitchComparisonComponent {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  options = ['Higher', 'Same', 'Lower'];
}
