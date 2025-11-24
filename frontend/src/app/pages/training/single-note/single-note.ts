import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-note.html',
  styleUrl: './single-note.scss',
})
export class SingleNoteComponent implements OnInit {
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  correctAnswer: string | null = null;

  constructor() {}

  ngOnInit(): void { this.generateNewQuestion(); }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.notes.length);
    this.correctAnswer = this.notes[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (!this.correctAnswer) return;
    console.log(`Playing note: ${this.correctAnswer}`);
    // TODO: Call your Audio Service here.
  }

  checkAnswer(selectedNote: string): void {
    this.questions++;
    if (selectedNote === this.correctAnswer) {
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
