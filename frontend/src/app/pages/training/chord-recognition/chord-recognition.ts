import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chord-recognition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chord-recognition.html',
  styleUrl: './chord-recognition.scss',
})
export class ChordRecognitionComponent implements OnInit {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  chords = ['Major', 'Minor', 'Dominant 7', 'Sus4', 'Power Chord', 'Major 6', 'Minor 6'];
  correctAnswer: string | null = null;

  constructor() {}

  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.chords.length);
    this.correctAnswer = this.chords[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (!this.correctAnswer) return;
    console.log(`Playing chord: ${this.correctAnswer}`);
    // TODO: Call your Audio Service here.
  }

  checkAnswer(selectedChord: string): void {
    this.questions++;
    if (selectedChord === this.correctAnswer) {
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
