import express, { Response } from "express";
import { supabase } from "../supabaseClient";
import { AuthedRequest, authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

interface UserRow {
  id: string;
  email: string;
}

// Hilfsfunktion: User-Email aus userId holen
async function getUserEmail(userId: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("users")
    .select("id, email")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  const user = data as UserRow;
  return user.email;
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

    const { exercise_id, score } = req.body as {
      exercise_id?: number;
      score?: number;
    };

    if (!exercise_id || score === undefined) {
      res.status(400).json({ error: "exercise_id und score nötig" });
      return;
    }

    const email = await getUserEmail(req.userId);
    if (!email) {
      res.status(400).json({ error: "User nicht gefunden" });
      return;
    }

    const { data, error } = await supabase
      .from("results")
      .insert({
        user_name: email,   // wir tragen Email in user_name ein
        exercise_id,
        score
      })
      .select("*")
      .single();

    if (error || !data) {
      res.status(400).json({ error: error?.message ?? "Fehler beim Speichern" });
      return;
    }

    res.status(201).json(data);
  }
);

// GET /api/results/my – Ergebnisse des eingeloggten Users
router.get(
  "/results/my",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: "Kein User im Token" });
      return;
    }

    const email = await getUserEmail(req.userId);
    if (!email) {
      res.status(400).json({ error: "User nicht gefunden" });
      return;
    }

    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("user_name", email)
      .order("created_at", { ascending: false });

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  }
);

export default router;
