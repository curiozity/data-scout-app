import { html, emptyState } from "./dom.js";
import { getPlayers, deletePlayer, getPlayerById } from "./players-service.js";
import { fillFormForEdit } from "./form.js";

// ======================================================
// UI DE JUGADORES (TABLA, LISTADO, BOTONES, PAGINACIÓN)
// ======================================================

let allPlayers = [];
let currentPage = 1;
const pageSize = 25;
let totalPages = 1;

// ------------------------------------------------------
// Cargar jugadores y mostrarlos
// ------------------------------------------------------
export async function loadPlayers(page = 1) {
  try {
    currentPage = page;
    html(
      "playersTableContainer",
      `<div class="loading">Cargando jugadores...</div>`
    );

    const { players, total } = await getPlayers({
      page: currentPage,
      pageSize,
    });

    allPlayers = players;
    totalPages = Math.max(1, Math.ceil(total / pageSize));

    if (allPlayers.length === 0) {
      emptyState("playersTableContainer", "📭 No hay jugadores");
      return;
    }

    renderPlayersTable(allPlayers);

  } catch (err) {
    html(
      "playersTableContainer",
      `<div class="alert alert-error">Error: ${err.message}</div>`
    );
  }
}

// ------------------------------------------------------
// Renderizar tabla HTML (incluye paginación debajo)
// ------------------------------------------------------
function renderPlayersTable(players) {
  let rows = "";

  players.forEach((p) => {
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

  html(
    "playersTableContainer",
    `
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
    <div class="pagination">
      <button class="btn btn-secondary btn-small" onclick="prevPage()" ${currentPage === 1 ? "disabled" : ""}>
        ⬅ Anterior
      </button>
      <span class="pagination-info">
        Página ${currentPage} de ${totalPages}
      </span>
      <button class="btn btn-secondary btn-small" onclick="nextPage()" ${currentPage === totalPages ? "disabled" : ""}>
        Siguiente ➡
      </button>
    </div>
  `
  );
}

// ------------------------------------------------------
// Controles de paginación (funciones globales)
// ------------------------------------------------------
window.prevPage = function () {
  if (currentPage > 1) {
    loadPlayers(currentPage - 1);
  }
};

window.nextPage = function () {
  if (currentPage < totalPages) {
    loadPlayers(currentPage + 1);
  }
};

// ------------------------------------------------------
// Editar jugador
// ------------------------------------------------------
window.editPlayer = async function (idJugadorBS) {
  const data = await getPlayerById(idJugadorBS);
  fillFormForEdit(data);

  // Cambiar a pestaña "Añadir/Editar"
  window.showTab("add");
};

// ------------------------------------------------------
// Eliminar jugador
// ------------------------------------------------------
window.removePlayer = async function (idJugadorBS) {
  if (!confirm("¿Eliminar jugador?")) return;

  await deletePlayer(idJugadorBS);
  await loadPlayers(currentPage);
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
