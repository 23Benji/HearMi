// frontend/src/app/models/training-session.ts

/**
 * Repräsentiert eine Training-Session eines Users.
 * Wird im Frontend genutzt + liefert Payload für die API.
 */
export class TrainingSession {
  constructor(
    public exerciseId: number,
    public modeName: string,
    public score: number,
    public totalQuestions: number,
    public accuracy: number,
    public bestStreak: number,
    public createdAt: Date = new Date()
  ) {}

  /**
   * Payload-Form, wie das Backend sie erwartet.
   * Aktuell: nur exercise_id + score.
   */
  toApiPayload() {
    return {
      exercise_id: this.exerciseId,
      score: this.score
    };
  }
}
