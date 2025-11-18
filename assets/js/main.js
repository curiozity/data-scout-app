import { detectSession } from "./auth.js";
import { loadPlayers } from "./players-ui.js";
import { loadStats } from "./stats-ui.js";

// ======================================================
// MAIN – PUNTO DE ENTRADA DE LA APLICACIÓN
// ======================================================

window.addEventListener("load", () => {
  detectSession();
});

// Tabs
window.showTab = function(tabName) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById(tabName).classList.add("active");

  if (tabName === "list") {
    loadPlayers();
  }
  if (tabName === "stats") {
    loadStats();
  }
};
