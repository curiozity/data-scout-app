// assets/js/main.js
import { detectSession } from "./auth.js";
import { loadPlayers } from "./players-ui.js";
import { loadStats } from "./stats-ui.js";

// ======================================================
// MAIN – PUNTO DE ENTRADA DE LA APLICACIÓN
// ======================================================

window.addEventListener("load", () => {
  detectSession();
});

// Función global para cambiar de pestaña
window.showTab = function (tabName) {
  // Quitar "active" de todos los botones
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  // Quitar "active" de todos los contenidos
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  // Marcar el botón que se ha pulsado (si existe event/currentTarget)
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add("active");
  }

  // Los contenidos tienen id="tab-config", "tab-list", "tab-add", "tab-stats"
  const contentId = `tab-${tabName}`;
  const contentEl = document.getElementById(contentId);

  if (!contentEl) {
    console.error("No se encontró el contenido de pestaña", {
      tabName,
      contentId,
    });
    return;
  }

  contentEl.classList.add("active");

  // Cargas específicas por pestaña
  if (tabName === "list") {
    loadPlayers();
  }
  if (tabName === "stats") {
    loadStats();
  }
};
