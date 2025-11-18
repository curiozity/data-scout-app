import { supabase } from "./supabase-client.js";

// ======================================================
// SERVICIO DE JUGADORES (CRUD)
// ======================================================

// Obtener todos los jugadores
export async function getPlayers() {
  const { data, error } = await supabase
    .from("jugadores")
    .select("*")
    .order("Jugador", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// Obtener un jugador por PK
export async function getPlayerById(idJugadorBS) {
  const { data, error } = await supabase
    .from("jugadores")
    .select("*")
    .eq("idJugadorBS", idJugadorBS)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Insertar jugador
export async function addPlayer(player) {
  const { error } = await supabase
    .from("jugadores")
    .insert([player]);

  if (error) throw new Error(error.message);
}

// Actualizar jugador
export async function updatePlayer(idJugadorBS, player) {
  const { error } = await supabase
    .from("jugadores")
    .update(player)
    .eq("idJugadorBS", idJugadorBS);

  if (error) throw new Error(error.message);
}

// Eliminar jugador
export async function deletePlayer(idJugadorBS) {
  const { error } = await supabase
    .from("jugadores")
    .delete()
    .eq("idJugadorBS", idJugadorBS);

  if (error) throw new Error(error.message);
}
