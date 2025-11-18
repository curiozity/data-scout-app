import { getPlayers } from "./players-service.js";

// ======================================================
// SERVICIO DE ESTADÍSTICAS
// ======================================================

export async function getStats() {
  const players = await getPlayers();

  const totalPlayers = players.length;

  const edades = players
    .filter(p => p.FechaNacimiento)
    .map(p => calcularEdad(p.FechaNacimiento));

  const estaturas = players
    .filter(p => p.Estatura)
    .map(p => p.Estatura);

  const posiciones = {};
  for (const p of players) {
    if (p.Posicion) posiciones[p.Posicion] = (posiciones[p.Posicion] || 0) + 1;
  }

  return {
    totalPlayers,
    avgAge: edades.length ? (edades.reduce((a,b)=>a+b,0) / edades.length).toFixed(1) : 0,
    avgHeight: estaturas.length ? Math.round(estaturas.reduce((a,b)=>a+b,0) / estaturas.length) : 0,
    mostCommonPosition: Object.keys(posiciones).length
      ? Object.entries(posiciones).sort((a,b)=>b[1]-a[1])[0][0]
      : "-",
    trackingCount: players.filter(p => p.Seguimiento).length,
    nacionalidades: new Set(players.map(p => p.Nacionalidad).filter(Boolean)).size
  };
}

function calcularEdad(fecha) {
  const hoy = new Date();
  const nac = new Date(fecha);
  let edad = hoy.getFullYear() - nac.getFullYear();

  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;

  return edad;
}
