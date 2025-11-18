import { html } from "./dom.js";
import { getStats } from "./stats-service.js";

// ======================================================
// UI DE ESTADÍSTICAS
// ======================================================

export async function loadStats() {
  const stats = await getStats();

  html("statsCards", `
    <div class="stat-card">
      <h3>${stats.totalPlayers}</h3>
      <p>Total Jugadores</p>
    </div>

    <div class="stat-card">
      <h3>${stats.avgAge}</h3>
      <p>Edad Promedio</p>
    </div>

    <div class="stat-card">
      <h3>${stats.mostCommonPosition}</h3>
      <p>Posición Más Común</p>
    </div>

    <div class="stat-card">
      <h3>${stats.trackingCount}</h3>
      <p>En Seguimiento</p>
    </div>

    <div class="stat-card">
      <h3>${stats.avgHeight} cm</h3>
      <p>Estatura Media</p>
    </div>

    <div class="stat-card">
      <h3>${stats.nacionalidades}</h3>
      <p>Nacionalidades</p>
    </div>
  `);
}
