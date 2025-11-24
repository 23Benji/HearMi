import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt in .env");
}

// Beschreibung, wie eine Zeile in der users-Tabelle aussieht
interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

// POST /auth/register
router.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({ error: "Email und Passwort nötig" });
      return;
    }

    try {
      const hash = await bcrypt.hash(password, 10);

      // KEIN Generic mehr bei .from(...)
      const { data, error } = await supabase
        .from("users")
        .insert({ email, password_hash: hash })
        .select("id, email")
        .single();

      if (error || !data) {
        res
          .status(400)
          .json({ error: error?.message ?? "Fehler bei Registrierung" });
        return;
      }

      const user = data as { id: string; email: string };

      res.status(201).json({ id: user.id, email: user.email });
    } catch (e) {
      res.status(500).json({ error: "Serverfehler bei Registrierung" });
    }
  }
);

// POST /auth/login
router.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      res.status(400).json({ error: "Email und Passwort nötig" });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        res.status(401).json({ error: "Login fehlgeschlagen" });
        return;
      }

      const user = data as UserRow;

      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        res.status(401).json({ error: "Login fehlgeschlagen" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "2h"
      });

      res.json({ token });
    } catch (e) {
      res.status(500).json({ error: "Serverfehler beim Login" });
    }
  }
);

export default router;
