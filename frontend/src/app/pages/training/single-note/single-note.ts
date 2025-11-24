import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './single-note.html',
  styleUrl: './single-note.scss',
})
export class SingleNoteComponent implements OnInit {
  // Session State
  score = 0; accuracy = 0; streak = 0; questions = 0;

  // Feedback & Game Flow State
  showFeedback = false;
  feedbackMessage = '';
  isCorrect: boolean | null = null;
  isAwaitingAnswer = false;

  // Game-specific variables
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  correctAnswer: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.generateNewQuestion();
  }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.notes.length);
    this.correctAnswer = this.notes[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.isAwaitingAnswer || this.showFeedback) return; // Prevent re-playing
    console.log(`Playing note: ${this.correctAnswer}`);
    // TODO: Call your Audio Service to play the note.
    this.isAwaitingAnswer = true; // Enable answer buttons
  }

  checkAnswer(selectedNote: string): void {
    if (!this.isAwaitingAnswer) return; // Prevent answering before playing
    this.isAwaitingAnswer = false; // Disable answer buttons immediately
    this.questions++;

    if (selectedNote === this.correctAnswer) {
      this.isCorrect = true;
      this.feedbackMessage = 'Great job!';
      this.score++;
      this.streak++;
    } else {
      this.isCorrect = false;
      this.feedbackMessage = `Not quite. The correct note was ${this.correctAnswer}.`;
      this.streak = 0;
    }
    this.accuracy = this.questions > 0 ? Math.round((this.score / this.questions) * 100) : 0;
    this.showFeedbackPopup();
  }

  showFeedbackPopup(): void {
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
      this.generateNewQuestion(); // Prepare next question after feedback disappears
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
