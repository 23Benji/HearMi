import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL oder SUPABASE_SERVICE_KEY fehlen in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
