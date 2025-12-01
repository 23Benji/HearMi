import express, { Response } from "express";
import { supabase } from "../supabaseClient";
import { AuthedRequest, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

interface UserRow {
  id: string;
  email: string;
  user_name: string | null;
}

interface ResultRow {
  id: number;
  user_id: string | null;
  exercise_id: number;
  score: number;
  total_questions: number | null;
  accuracy: number | null;
  best_streak: number | null;
  created_at: string;
  user_name?: string | null;
}

// User aus users-Tabelle holen
async function getUser(userId: string): Promise<UserRow | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, user_name")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data as UserRow;
}

// POST /api/results – Ergebnis speichern
router.post(
  "/results",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: "Kein User im Token" });
      return;
    }

    const {
      exercise_id,
      score,
      total_questions,
      accuracy,
      best_streak
    } = req.body as {
      exercise_id?: number;
      score?: number;
      total_questions?: number;
      accuracy?: number;
      best_streak?: number;
    };

    if (!exercise_id || score === undefined) {
      res.status(400).json({ error: "exercise_id und score nötig" });
      return;
    }

    const user = await getUser(req.userId);
    if (!user) {
      res.status(400).json({ error: "User nicht gefunden" });
      return;
    }

    const { data, error } = await supabase
      .from("results")
      .insert({
        user_id: req.userId,
        user_name: user.user_name ?? user.email,
        exercise_id,
        score,
        total_questions,
        accuracy,
        best_streak
      })
      .select("*")
      .single();

    if (error || !data) {
      res
        .status(400)
        .json({ error: error?.message ?? "Fehler beim Speichern" });
      return;
    }

    res.status(201).json(data);
  }
);

// GET /api/results/my – alle Ergebnisse des eingeloggten Users
router.get(
  "/results/my",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: "Kein User im Token" });
      return;
    }

    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  }
);

// GET /api/results/summary – Dashboard-Stats für eingeloggten User
router.get(
  "/results/summary",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: "Kein User im Token" });
      return;
    }

    // 1) Alle Ergebnisse dieses Users holen
    const { data: resultsData, error } = await supabase
      .from("results")
      .select(
        "id, user_id, exercise_id, score, total_questions, accuracy, best_streak, created_at"
      )
      .eq("user_id", req.userId)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    const results = (resultsData ?? []) as ResultRow[];

    // 2) Versuchen, die Übungen zu laden – aber NICHT fehlschlagen,
    //    falls die Tabelle nicht existiert oder anders heißt.
    const exerciseMap = new Map<number, string>();

    const { data: exercisesData, error: exError } = await supabase
      .from("exercises")
      .select("id, name");

    if (!exError && exercisesData) {
      (exercisesData as any[]).forEach((ex) => {
        exerciseMap.set(ex.id, ex.name);
      });
    } else if (exError) {
      // Nur serverseitig loggen, aber keinen 400 an den Client schicken
      console.error(
        "Konnte Tabelle 'exercises' nicht laden – verwende Fallback-Namen:",
        exError.message
      );
    }

    // 3) Aggregation in Node
    const totalSessions = results.length;
    let totalCorrect = 0;
    let totalQuestions = 0;

    type PerExerciseStat = {
      exerciseId: number;
      exerciseName: string;
      sessions: number;
      bestAccuracy: number | null;
      bestStreak: number | null;
    };

    const perExerciseMap = new Map<number, PerExerciseStat>();

    for (const r of results) {
      totalCorrect += r.score ?? 0;

      if (r.total_questions != null) {
        totalQuestions += r.total_questions;
      }

      const exerciseName =
        exerciseMap.get(r.exercise_id) ?? `Exercise ${r.exercise_id}`;

      let stat = perExerciseMap.get(r.exercise_id);
      if (!stat) {
        stat = {
          exerciseId: r.exercise_id,
          exerciseName,
          sessions: 0,
          bestAccuracy: null,
          bestStreak: null
        };
        perExerciseMap.set(r.exercise_id, stat);
      }

      stat.sessions += 1;

      if (r.accuracy != null) {
        stat.bestAccuracy =
          stat.bestAccuracy != null
            ? Math.max(stat.bestAccuracy, r.accuracy)
            : r.accuracy;
      }

      if (r.best_streak != null) {
        stat.bestStreak =
          stat.bestStreak != null
            ? Math.max(stat.bestStreak, r.best_streak)
            : r.best_streak;
      }
    }

    const overallAccuracy =
      totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

    const perExercise = Array.from(perExerciseMap.values());

    const recentSessions = results.slice(0, 5).map((r) => ({
      id: r.id,
      exerciseId: r.exercise_id,
      exerciseName:
        exerciseMap.get(r.exercise_id) ?? `Exercise ${r.exercise_id}`,
      score: r.score,
      totalQuestions: r.total_questions,
      accuracy: r.accuracy,
      bestStreak: r.best_streak,
      createdAt: r.created_at
    }));

    res.json({
      totalSessions,
      totalCorrect,
      overallAccuracy,
      perExercise,
      recentSessions
    });
  }
);

export default router;
