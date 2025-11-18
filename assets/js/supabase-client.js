import { config } from "./config.js";

// Inicialización del cliente de Supabase
export const supabase = window.supabase.createClient(
  config.supabaseUrl,
  config.supabaseAnonKey
);
