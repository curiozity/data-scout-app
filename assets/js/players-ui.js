import { $, html, emptyState } from "./dom.js";
import { 
  getPlayers, 
  deletePlayer, 
  getPlayerById 
} from "./players-service.js";
import { fillFormForEdit } from "./form.js";

// ======================================================
// UI DE JUGADORES (TABLA, LISTADO, BOTONES)
// ======================================================

let allPlayers = [];

// ------------------------------------------------------
// Cargar jugadores y mostrarlos
// ------------------------------------------------------
export async function loadPlayers() {
  try {
    html("playersTableContainer", `<div class="loading">Cargando jugadores...</div>`);

    allPlayers = await getPlayers();

    if (allPlayers.length === 0) {
      emptyState("playersTableContainer", "📭 No hay jugadores");
      return;
    }

    renderPlayersTable(allPlayers);

  } catch (err) {
    html("playersTableContainer",
      `<div class="alert alert-error">Error: ${err.message}</div>`
    );
  }
}

// ------------------------------------------------------
// Renderizar tabla HTML
// ------------------------------------------------------
function renderPlayersTable(players) {
  let rows = "";

  players.forEach(p => {
    const edad = p.FechaNacimiento ? calcularEdad(p.FechaNacimiento) : "-";
    const seguimiento = p.Seguimiento ? "✅" : "❌";

    rows += `
      <tr>
        <td>${p.Jugador || "-"}</td>
        <td>${p.Posicion || "-"}</td>
        <td>${p.Nacionalidad || "-"}</td>
        <td>${edad}</td>
        <td>${p.Estatura ? p.Estatura + " cm" : "-"}</td>
        <td>${p.Peso ? p.Peso + " kg" : "-"}</td>
        <td>${p.Pie || "-"}</td>
        <td>${seguimiento}</td>
        <td>
          <button class="btn btn-secondary btn-small" onclick="editPlayer(${p.idJugadorBS})">✏️</button>
          <button class="btn btn-danger btn-small" onclick="removePlayer(${p.idJugadorBS})">🗑️</button>
        </td>
      </tr>
    `;
  });

  html("playersTableContainer", `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Posición</th>
            <th>Nacionalidad</th>
            <th>Edad</th>
            <th>Estatura</th>
            <th>Peso</th>
            <th>Pie</th>
            <th>Seguimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `);
}

// ------------------------------------------------------
// Editar jugador
// ------------------------------------------------------
window.editPlayer = async function(idJugadorBS) {
  const data = await getPlayerById(idJugadorBS);
  fillFormForEdit(data);

  // Cambiar a pestaña "Añadir/Editar"
  document.querySelector(`[onclick="showTab('add')"]`).click();
};

// ------------------------------------------------------
// Eliminar jugador
// ------------------------------------------------------
window.removePlayer = async function(idJugadorBS) {
  if (!confirm("¿Eliminar jugador?")) return;

  await deletePlayer(idJugadorBS);
  await loadPlayers();
};

// ------------------------------------------------------
// Calcular edad
// ------------------------------------------------------
function calcularEdad(fecha) {
  const hoy = new Date();
  const nac = new Date(fecha);
  let edad = hoy.getFullYear() - nac.getFullYear();

  const m = hoy.getMonth() - nac.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;

  return edad;
}
