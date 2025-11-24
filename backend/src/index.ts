import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes";
import exerciseRoutes from "./routes/exerciseRoutes";
import resultRoutes from "./routes/resultRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// statische Dateien (Uploads)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routen
app.use("/auth", authRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", resultRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API läuft auf Port ${port}`);
});
