import { supabase } from "./supabase-client.js";

// ======================================================
// SERVICIO DE JUGADORES (CRUD + PAGINACIÓN)
// ======================================================

// Obtener jugadores con paginación
// page: nº de página (1-based)
// pageSize: registros por página
export async function getPlayers({ page = 1, pageSize = 25 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("jugadores")
    .select("*", { count: "exact" })
    .order("Jugador", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  return {
    players: data || [],
    total: count || 0,
  };
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
  const { error } = await supabase.from("jugadores").insert([player]);
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
