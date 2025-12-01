import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../supabaseClient";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt in .env");
}
interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  user_name?: string | null;
}

// POST /auth/register
router.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password, username } = req.body as {
      email?: string;
      password?: string;
      username?: string;
    };

    if (!email || !password || !username) {
      res.status(400).json({ error: "Email, Benutzername und Passwort nötig" });
      return;
    }

    try {
      const hash = await bcrypt.hash(password, 10);

      const { data, error } = await supabase
        .from("users")
        .insert({
          email,
          password_hash: hash,
          user_name: username
        })
        .select("id, email, user_name")
        .single();

      if (error || !data) {
        res
          .status(400)
          .json({ error: error?.message ?? "Fehler bei Registrierung" });
        return;
      }

      res.status(201).json({
        id: data.id,
        email: data.email,
        username: data.user_name
      });
    } catch (e) {
      res.status(500).json({ error: "Serverfehler bei Registrierung" });
    }
  }
);


// POST /auth/login
router.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    const { identifier, password } = req.body as {
      identifier?: string; // kann Email ODER Username sein
      password?: string;
    };

    if (!identifier || !password) {
      res
        .status(400)
        .json({ error: "Email/Benutzername und Passwort nötig" });
      return;
    }

    try {
      // 1. Versuch: Email
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", identifier)
        .single();

      // 2. Versuch: Username, falls über Email nichts gefunden
      if (error || !data) {
        const byUsername = await supabase
          .from("users")
          .select("*")
          .eq("user_name", identifier)
          .single();

        data = byUsername.data;
        error = byUsername.error;
      }

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

      // Token enthält jetzt schon userId UND username (für Schritt 4)
      const token = jwt.sign(
        { userId: user.id, username: user.user_name },
        JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({ token });
    } catch (e) {
      res.status(500).json({ error: "Serverfehler beim Login" });
    }
  }
);


export default router;
