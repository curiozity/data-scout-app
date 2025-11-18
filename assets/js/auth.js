import { supabase } from "./supabase-client.js";

// ======================================================
// AUTENTICACIÓN: LOGIN / REGISTRO / LOGOUT
// ======================================================

const authView = document.getElementById("auth-view");
const appView  = document.getElementById("app-view");
const userEmailLabel = document.getElementById("user-email");
const logoutBtn = document.getElementById("btn-logout");

// Formularios
const loginForm  = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

// Botones para mostrar/ocultar formularios
const btnShowSignup = document.getElementById("btn-show-signup");
const btnCancelSignup = document.getElementById("btn-cancel-signup");

// Alertas
const authAlert = document.getElementById("auth-alert");

// ======================================================
// Mostrar mensajes
// ======================================================
function showAuthError(message) {
  authAlert.innerHTML = `<div class="alert alert-error">${message}</div>`;
}

function clearAuthError() {
  authAlert.innerHTML = "";
}

// ======================================================
// Cambiar entre vistas
// ======================================================
export function showAuthView() {
  authView.classList.remove("hidden");
  appView.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  userEmailLabel.textContent = "";
}

export function showAppView(userEmail) {
  authView.classList.add("hidden");
  appView.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  userEmailLabel.textContent = userEmail;
}

// ======================================================
// LOGIN
// ======================================================
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAuthError();

  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showAuthError(error.message);
    return;
  }

  showAppView(email);
});

// ======================================================
// REGISTRO
// ======================================================
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAuthError();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    showAuthError(error.message);
    return;
  }

  showAuthError("Cuenta creada. Revisa tu correo para confirmar.");
});

// Mostrar formulario de registro
if (btnShowSignup && signupForm && loginForm) {
  btnShowSignup.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  });
}

// Ocultar formulario de registro
if (btnCancelSignup && signupForm && loginForm) {
  btnCancelSignup.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });
}

// ======================================================
// LOGOUT
// ======================================================
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  showAuthView();
});

// ======================================================
// DETECTAR SESIÓN ACTUAL
// ======================================================
export async function detectSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    showAppView(data.session.user.email);
  } else {
    showAuthView();
  }
}

// Escuchar cambios de sesión en tiempo real
supabase.auth.onAuthStateChange((_event, session) => {
  if (session) {
    showAppView(session.user.email);
  } else {
    showAuthView();
  }
});
