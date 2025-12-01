// frontend/src/app/pages/training/single-note/single-note.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

// Services
import { AudioService } from '../../../services/audio';
import { TrainingService } from '../../../services/training.service';
import { TrainingSession } from '../../../models/training-session';

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './single-note.html',
  styleUrl: './single-note.scss',
})
export class SingleNoteComponent implements OnInit {
  // Session State
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;

  // Feedback & Game Flow State
  showFeedback = false;
  feedbackMessage = '';
  isCorrect: boolean | null = null;
  isAwaitingAnswer = false;

  // UI-State für Speichern
  isSaving = false;
  saveSuccess = '';
  saveError = '';

  // Game-specific variables
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  correctAnswer: string | null = null;

  constructor(
    private audioService: AudioService,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.generateNewQuestion();
  }

  generateNewQuestion(): void {
    const randomIndex = Math.floor(Math.random() * this.notes.length);
    this.correctAnswer = this.notes[randomIndex];
    console.log(`New question: Correct answer is ${this.correctAnswer}`);
  }

  playChallenge(): void {
    if (this.isAwaitingAnswer || this.showFeedback || !this.correctAnswer) return;

    this.audioService.playNoteByName(this.correctAnswer);
    this.isAwaitingAnswer = true;
  }

  checkAnswer(selectedNote: string): void {
    if (!this.isAwaitingAnswer) return;
    this.isAwaitingAnswer = false;
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

    this.accuracy =
      this.questions > 0
        ? Math.round((this.score / this.questions) * 100)
        : 0;

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
    this.score = 0;
    this.accuracy = 0;
    this.streak = 0;
    this.questions = 0;
    this.isAwaitingAnswer = false;
    this.showFeedback = false;

    // Meldungen resetten
    this.saveSuccess = '';
    this.saveError = '';

    this.generateNewQuestion();
  }

  saveSession(): void {
    // keine Fragen gespielt -> nicht speichern
    if (this.questions === 0) {
      this.saveError = 'No data to save yet. Answer a few questions first.';
      this.saveSuccess = '';
      return;
    }

    this.isSaving = true;
    this.saveSuccess = '';
    this.saveError = '';

    const session = new TrainingSession(
      1,                // exercise_id für Single Note
      'Single Note',
      this.score,
      this.questions,
      this.accuracy,
      this.streak
    );

    this.trainingService.saveSession(session).subscribe({
      next: () => {
        this.isSaving = false;
        this.saveSuccess = 'Session saved successfully 🎉';
        this.saveError = '';

        // Session zurücksetzen, nachdem gespeichert wurde
        this.resetSession();
      },
      error: (err) => {
        console.error('Error saving Single Note session', err);
        this.isSaving = false;
        this.saveError = 'Could not save session. Please try again.';
        this.saveSuccess = '';
      }
    });
  }
}
