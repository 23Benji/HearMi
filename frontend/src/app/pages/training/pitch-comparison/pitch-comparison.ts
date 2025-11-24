import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-pitch-comparison',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pitch-comparison.html',
  styleUrl: './pitch-comparison.scss',
})
export class PitchComparisonComponent implements OnInit {
  score = 0; accuracy = 0; streak = 0; questions = 0;
  showFeedback = false; feedbackMessage = ''; isCorrect: boolean | null = null;
  isAwaitingAnswer = false;

  options = ['Higher', 'Same', 'Lower'];
  private note1: number | null = null; private note2: number | null = null;
  private correctAnswer: string | null = null; private difference = 0;

  constructor() {}
  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const baseNote = 60, range = 12;
    this.note1 = baseNote + Math.floor(Math.random() * range);
    const decision = Math.floor(Math.random() * 3);

    if (decision === 0) {
      this.difference = -(Math.floor(Math.random() * (range / 2)) + 1);
      this.correctAnswer = 'Lower';
    } else if (decision === 1) {
      this.difference = 0;
      this.correctAnswer = 'Same';
    } else {
      this.difference = Math.floor(Math.random() * (range / 2)) + 1;
      this.correctAnswer = 'Higher';
    }
    this.note2 = this.note1 + this.difference;
    console.log(`New question: Note 1 (${this.note1}), Note 2 (${this.note2}). Correct is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.isAwaitingAnswer || this.showFeedback) return;
    console.log('Playing challenge...');
    // TODO: Call your Audio Service here.
    this.isAwaitingAnswer = true;
  }

  checkAnswer(selectedOption: string): void {
    if (!this.isAwaitingAnswer) return;
    this.isAwaitingAnswer = false;
    this.questions++;

    if (selectedOption === this.correctAnswer) {
      this.isCorrect = true; this.feedbackMessage = 'Correct!';
      this.score++; this.streak++;
    } else {
      this.isCorrect = false; this.feedbackMessage = `Wrong. It was ${Math.abs(this.difference)} semitones ${this.correctAnswer?.toLowerCase()}.`;
      this.streak = 0;
    }

    this.accuracy = Math.round((this.score / this.questions) * 100);
    this.showFeedbackPopup();
  }

  showFeedbackPopup(): void {
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
      this.generateNewQuestion();
    }, 2500);
  }

  resetSession(): void {
    this.score = 0; this.accuracy = 0; this.streak = 0; this.questions = 0;
    this.isAwaitingAnswer = false; this.showFeedback = false;
    this.generateNewQuestion();
  }

  saveSession(): void { console.log('Saving session...'); /* TODO */ }
}
