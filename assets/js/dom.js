// ======================================================
// UTILIDADES PARA EL DOM
// ======================================================

// Obtener elemento por ID
export function $(id) {
  return document.getElementById(id);
}

// Crear elemento con clases opcionales
export function createEl(tag, classNames = "") {
  const el = document.createElement(tag);
  if (classNames) el.className = classNames;
  return el;
}

// Insertar HTML en un contenedor
export function html(id, content) {
  $(id).innerHTML = content;
}

// Mostrar alertas
export function showAlert(containerId, message, type = "success") {
  const container = $(containerId);
  
  container.innerHTML = `
    <div class="alert alert-${type}">
      ${message}
    </div>
  `;

  setTimeout(() => container.innerHTML = "", 4000);
}

// Mostrar estado vacío
export function emptyState(containerId, message) {
  html(containerId, `
    <div class="empty-state">
      <h3>${message}</h3>
    </div>
  `);
}
