import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interval-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interval-training.html',
  styleUrl: './interval-training.scss',
})
export class IntervalTrainingComponent implements OnInit {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  intervals = ['Unison', 'm2', 'M2', 'm3', 'M3', 'P4', 'Tritone', 'P5', 'm6', 'M6', 'm7', 'M7', 'Octave'];
  correctAnswer: string | null = null;

  constructor() {}

  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.intervals.length);
    this.correctAnswer = this.intervals[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (!this.correctAnswer) return;
    console.log(`Playing interval: ${this.correctAnswer}`);
    // TODO: Call your Audio Service here.
  }

  checkAnswer(selectedInterval: string): void {
    this.questions++;
    if (selectedInterval === this.correctAnswer) {
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
