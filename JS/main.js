import { state } from "./state.js";
import { fish, fetchInventory } from "./api.js";
import {
  handleLogin,
  handleRegister,
  handleLogout,
  handleTwitchCallback,
  checkLoginStatus,
} from "./auth.js";
import { initializeTwitchEmbeds } from "./twitch.js";
import { showMessage, displayInventory } from "./ui.js";

// --- Gestionnaires d'événements ---

document.getElementById("login-form").addEventListener("submit", handleLogin);
document
  .getElementById("register-form")
  .addEventListener("submit", handleRegister);

document.getElementById("cast-line-btn").addEventListener("click", async () => {
  const btn = document.getElementById("cast-line-btn");
  btn.disabled = true;
  btn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Pêche en cours...';
  try {
    const result = await fish(state.token);
    showMessage("messageBox", result.msg, true);
    if (result.poisson) {
      // Mettre à jour l'argent et l'inventaire
      state.currentUser.argent = result.nouvelArgent;
      document.getElementById(
        "player-money"
      ).textContent = `${result.nouvelArgent} $`;
      const newInventory = await fetchInventory(state.token);
      displayInventory(newInventory);
    }
  } catch (error) {
    showMessage("messageBox", error.message, false);
  } finally {
    btn.disabled = false;
    btn.textContent = "Lancer la ligne !";
  }
});

// Utiliser la délégation d'événements pour le bouton de déconnexion
document.body.addEventListener("click", (e) => {
  if (e.target.id === "logout-btn") {
    handleLogout();
  }
});

// --- Initialisation de l'application ---
function init() {
  handleTwitchCallback();
  checkLoginStatus();
  initializeTwitchEmbeds();
}

// Lancer l'initialisation une fois que le DOM est prêt
document.addEventListener("DOMContentLoaded", init);
