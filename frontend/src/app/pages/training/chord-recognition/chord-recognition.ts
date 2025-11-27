// frontend/src/app/pages/training/chord-recognition/chord-recognition.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

// 1. Import the AudioService
import { AudioService } from '../../../services/audio';

@Component({
  selector: 'app-chord-recognition',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './chord-recognition.html',
  styleUrl: './chord-recognition.scss',
})
export class ChordRecognitionComponent implements OnInit {
  score = 0; accuracy = 0; streak = 0; questions = 0;
  showFeedback = false; feedbackMessage = ''; isCorrect: boolean | null = null;
  isAwaitingAnswer = false;

  chords = ['Major', 'Minor', 'Dominant 7', 'Sus4', 'Power Chord'];
  correctAnswer: string | null = null;

  // 2. Inject the AudioService in the constructor
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.generateNewQuestion();
  }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.chords.length);
    this.correctAnswer = this.chords[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.isAwaitingAnswer || this.showFeedback || !this.correctAnswer) return;

    // 3. Replace the console.log with a call to our service's new method
    this.audioService.playChordByName(this.correctAnswer);

    this.isAwaitingAnswer = true;
  }

  checkAnswer(selectedChord: string): void {
    if (!this.isAwaitingAnswer) return;
    this.isAwaitingAnswer = false;
    this.questions++;

    if (selectedChord === this.correctAnswer) {
      this.isCorrect = true;
      this.feedbackMessage = 'Correct!';
      this.score++;
      this.streak++;
    } else {
      this.isCorrect = false;
      this.feedbackMessage = `Incorrect. The chord was ${this.correctAnswer}.`;
      this.streak = 0;
    }
    this.accuracy = this.questions > 0 ? Math.round((this.score / this.questions) * 100) : 0;
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

  saveSession(): void {
    console.log('Saving session to backend...');
    // TODO: Call your backend data service here.
  }
}
