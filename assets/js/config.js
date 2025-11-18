// ======================================================
// CONFIGURACIÓN PRINCIPAL DE LA APLICACIÓN
// ======================================================

// ⚠️ IMPORTANTE:
// No coloques aquí la service_role_key.
// Esta clave debe ser SIEMPRE privada (servidor).
// Para frontend solo debemos usar la anon key pública.

// ======================================================
// CONFIGURACIÓN DE SUPABASE
// ======================================================

// 👉 Pon aquí tu URL de Supabase:
const SUPABASE_URL = "https://bjejzvfchjalvbdprazt.supabase.co";

// 👉 Pon aquí tu clave pública ANON:
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZWp6dmZjaGphbHZiZHByYXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNzk3MjYsImV4cCI6MjA3ODk1NTcyNn0.-ASIvRucQieZrwbiVYEvnguRvNN9S2mRJTRapcypN_I";

// Exportamos para que otros módulos puedan usarlo
export const config = {
  supabaseUrl: SUPABASE_URL,
  supabaseAnonKey: SUPABASE_ANON_KEY
};
