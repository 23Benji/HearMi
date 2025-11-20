// frontend/src/app/pages/training/single-note/single-note.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngFor

@Component({
  selector: 'app-single-note',
  standalone: true,
  imports: [CommonModule], // Add this!
  templateUrl: './single-note.html',
  styleUrl: './single-note.scss'
})
export class SingleNoteComponent {
  // Game state variables
  score = 0;
  accuracy = 0;
  streak = 0;
  questions = 0;

  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  currentNote: string | null = null;

  // You will need to create and inject a service for the Web Audio API
  // constructor(private audioService: AudioService) {}

  constructor() {
    this.generateNewNote();
  }

  generateNewNote() {
    const randomIndex = Math.floor(Math.random() * this.notes.length);
    this.currentNote = this.notes[randomIndex];
    console.log('New note to guess:', this.currentNote); // For debugging
  }

  playNote() {
    // Here you would call your audio service to play the note
    // this.audioService.play(this.currentNote);
    console.log('Playing note:', this.currentNote);
  }

  selectNote(selectedNote: string) {
    this.questions++;
    if (selectedNote === this.currentNote) {
      console.log('Correct!');
      this.score++;
      this.streak++;
    } else {
      console.log('Incorrect! The correct note was', this.currentNote);
      this.streak = 0;
    }
    this.accuracy = Math.round((this.score / this.questions) * 100);
    this.generateNewNote(); // Get ready for the next round
  }
}
