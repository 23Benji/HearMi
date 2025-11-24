import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { supabase } from "../supabaseClient";
import { authMiddleware, AuthedRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Upload-Konfiguration: Speicherort backend/uploads
const upload = multer({
  dest: path.join(__dirname, "..", "..", "uploads")
});

// GET /api/exercises  – alle Übungen holen
router.get(
  "/exercises",
  async (_req: Request, res: Response): Promise<void> => {
    const { data, error } = await supabase.from("exercises").select("*");

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json(data);
  }
);

// POST /api/exercises – neue Übung mit Audio hochladen
router.post(
  "/exercises",
  authMiddleware,                 // nur eingeloggte dürfen hochladen
  upload.single("audio"),         // Feldname im Formular: "audio"
  async (req: AuthedRequest, res: Response): Promise<void> => {
    const { name, difficulty } = req.body as {
      name?: string;
      difficulty?: string;
    };
    const file = req.file;

    if (!name || !difficulty) {
      res.status(400).json({ error: "Name und Difficulty nötig" });
      return;
    }

    if (!file) {
      res.status(400).json({ error: "Audio-Datei fehlt" });
      return;
    }

    const audioPath = `/uploads/${file.filename}`;

    const { data, error } = await supabase
      .from("exercises")
      .insert({
        name,
        difficulty: Number(difficulty),
        audio_path: audioPath
      })
      .select("*")
      .single();

    if (error || !data) {
      res.status(400).json({ error: error?.message ?? "Fehler beim Erstellen" });
      return;
    }

    res.status(201).json(data);
  }
);

export default router;
