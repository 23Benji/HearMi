import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pitch-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pitch-comparison.html',
  styleUrl: './pitch-comparison.scss',
})
export class PitchComparisonComponent implements OnInit {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  options = ['Higher', 'Same', 'Lower'];
  private note1: number | null = null;
  private note2: number | null = null;
  private correctAnswer: string | null = null;

  constructor() {}

  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const baseNote = 60, range = 12;
    this.note1 = baseNote + Math.floor(Math.random() * range);
    const decision = Math.floor(Math.random() * 3);
    if (decision === 0) {
      this.note2 = this.note1 - (Math.floor(Math.random() * (range / 2)) + 1);
      this.correctAnswer = 'Lower';
    } else if (decision === 1) {
      this.note2 = this.note1;
      this.correctAnswer = 'Same';
    } else {
      this.note2 = this.note1 + (Math.floor(Math.random() * (range / 2)) + 1);
      this.correctAnswer = 'Higher';
    }
    console.log(`New question: Note 1 (${this.note1}), Note 2 (${this.note2}). Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.note1 === null || this.note2 === null) return;
    console.log('Playing challenge...');
    // TODO: Call your Audio Service here.
  }

  checkAnswer(selectedOption: string): void {
    this.questions++;
    if (selectedOption === this.correctAnswer) {
      this.score++;
      this.streak++;
    } else {
      this.streak = 0;
    }
    this.accuracy = this.questions > 0 ? Math.round((this.score / this.questions) * 100) : 0;
    this.generateNewQuestion();
  }

  resetSession(): void {
    this.score = 0;
    this.accuracy = 0;
    this.streak = 0;
    this.questions = 0;
    this.generateNewQuestion();
  }

  saveSession(): void {
    console.log('Saving session to backend...');
    // TODO: Call your backend data service here.
  }
}
