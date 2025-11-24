import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt in .env");
}

export interface AuthedRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Kein Token mitgeschickt" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Falsches Auth-Format" });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ error: "Kein Token gefunden" });
  }

  try {
    // verify liefert ein JwtPayload (Key-Value-Objekt)
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      return res.status(401).json({ error: "Ungültiges Token" });
    }

    req.userId = decoded.userId as string;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Ungültiges Token" });
  }
}
