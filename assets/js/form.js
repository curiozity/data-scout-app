import { addPlayer, updatePlayer } from "./players-service.js";
import { $, showAlert } from "./dom.js";
import { loadPlayers } from "./players-ui.js";

// ======================================================
// FORMULARIO DE JUGADORES
// ======================================================

// Rellena el formulario al editar un jugador
export function fillFormForEdit(player) {

  $("formTitle").textContent = "✏️ Editar Jugador";

  $("idJugadorBS").value   = player.idJugadorBS;
  $("idJugador").value     = player.idJugador || "";
  $("idWS").value          = player.idWS || "";
  $("Jugador").value       = player.Jugador || "";
  $("idEquipo").value      = player.idEquipo || "";
  $("FechaNacimiento").value = player.FechaNacimiento || "";
  $("Nacionalidad").value  = player.Nacionalidad || "";
  $("Peso").value          = player.Peso || "";
  $("Estatura").value      = player.Estatura || "";
  $("Posicion").value      = player.Posicion || "";
  $("Pie").value           = player.Pie || "";
  $("Seguimiento").checked = !!player.Seguimiento;
  $("bsURL").value         = player.bsURL || "";
  $("Procesar").checked    = !!player.Procesar;
  $("ProcesarBin").value   = player.ProcesarBin || "";

  if (player.FechaProcesado) {
    const dt = new Date(player.FechaProcesado).toISOString().slice(0,16);
    $("FechaProcesado").value = dt;
  }
}

// Limpia el formulario a nuevo
export function resetForm() {
  $("playerForm").reset();
  $("idJugadorBS").value = "";
  $("formTitle").textContent = "➕ Añadir Nuevo Jugador";
}

// Guardar jugador (insert/update)
export async function savePlayer(event) {
  event.preventDefault();

  const playerId = $("idJugadorBS").value;

  const player = {
    idJugador: $("idJugador").value || null,
    idWS: $("idWS").value || null,
    Jugador: $("Jugador").value,
    idEquipo: $("idEquipo").value || null,
    FechaNacimiento: $("FechaNacimiento").value || null,
    Nacionalidad: $("Nacionalidad").value || null,
    Peso: $("Peso").value ? parseInt($("Peso").value) : null,
    Estatura: $("Estatura").value ? parseInt($("Estatura").value) : null,
    Posicion: $("Posicion").value || null,
    Pie: $("Pie").value || null,
    Seguimiento: $("Seguimiento").checked,
    bsURL: $("bsURL").value || null,
    Procesar: $("Procesar").checked,
    ProcesarBin: $("ProcesarBin").value ? parseInt($("ProcesarBin").value) : null,
    FechaProcesado: $("FechaProcesado").value || null,
    Modificado: new Date().toISOString()
  };

  try {
    if (playerId) {
      await updatePlayer(playerId, player);
      showAlert("alertContainer", "Jugador actualizado correctamente", "success");
    } else {
      await addPlayer(player);
      showAlert("alertContainer", "Jugador añadido correctamente", "success");
    }

    resetForm();
    loadPlayers();

  } catch (error) {
    showAlert("alertContainer", error.message, "error");
  }
}

// Asignar evento al formulario
if ($("playerForm")) {
  $("playerForm").addEventListener("submit", savePlayer);
}
