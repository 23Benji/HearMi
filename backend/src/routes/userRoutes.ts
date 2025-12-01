import express, { Response } from "express";
import multer from "multer";
import { supabase } from "../supabaseClient";
import { authMiddleware, AuthedRequest } from "../middleware/authMiddleware";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/user/avatar - Upload/Update
router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId || !req.file) {
      res.status(400).json({ error: "User ID or file missing" });
      return;
    }

    try {
      const file = req.file;
      const fileExt = file.originalname.split(".").pop();
      const fileName = `${req.userId}-${Date.now()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // 3. Save to DB
      const { error: dbError } = await supabase
        .from("user_avatars")
        .upsert(
          { user_id: req.userId, avatar_url: publicUrl },
          { onConflict: "user_id" }
        );

      if (dbError) throw dbError;

      res.json({ avatarUrl: publicUrl });
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  }
);

// GET /api/user/avatar - Get current
router.get(
  "/avatar",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from("user_avatars")
        .select("avatar_url")
        .eq("user_id", req.userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      res.json({ avatarUrl: data ? data.avatar_url : null });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch avatar" });
    }
  }
);

// DELETE /api/user/avatar - Remove avatar
router.delete(
  "/avatar",
  authMiddleware,
  async (req: AuthedRequest, res: Response): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      // 1. Get current URL to find the file path
      const { data: dbData, error: dbFetchError } = await supabase
        .from("user_avatars")
        .select("avatar_url")
        .eq("user_id", req.userId)
        .single();

      if (dbFetchError || !dbData) {
        // No avatar found, consider it a success
        res.json({ success: true });
        return;
      }

      // Extract filename from URL 
      // URL format: .../avatars/public/filename.ext
      const urlParts = dbData.avatar_url.split('/avatars/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1]; // should be "public/filename.ext"
        
        // 2. Remove from Storage
        const { error: storageError } = await supabase.storage
          .from("avatars")
          .remove([filePath]);
          
        if (storageError) console.error("Storage delete error (non-fatal):", storageError);
      }

      // 3. Remove from DB
      const { error: dbDeleteError } = await supabase
        .from("user_avatars")
        .delete()
        .eq("user_id", req.userId);

      if (dbDeleteError) throw dbDeleteError;

      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete avatar error:", error);
      res.status(500).json({ error: "Failed to delete avatar" });
    }
  }
);

export default router;