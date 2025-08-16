// On récupère toutes les références au DOM une seule fois
const elements = {
  playerName: document.getElementById("player-name"),
  playerMoney: document.getElementById("player-money"),
  authButtons: document.getElementById("auth-buttons"),
  castLineBtn: document.getElementById("cast-line-btn"),
  gameStatus: document.getElementById("game-status"),
  inventoryList: document.getElementById("inventory-list"),
  loginMessage: document.getElementById("login-message"),
  registerMessage: document.getElementById("register-message"),
  messageBox: document.getElementById("message-box"),
};

export function updateUIForLoggedInUser(user) {
  elements.playerName.textContent = user.pseudo;
  elements.playerMoney.textContent = `${user.argent} $`;
  elements.authButtons.innerHTML = `<div class="d-flex justify-content-center gap-2"><button id="store-btn" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#storeModal"><i class="bi bi-shop"></i> Magasin</button><button id="logout-btn" class="btn btn-outline-danger"><i class="bi bi-box-arrow-right"></i> Déconnexion</button></div>`;
  elements.castLineBtn.disabled = false;
  elements.gameStatus.textContent = "Prêt à pêcher !";
}

export function updateUIForLoggedOutUser() {
  elements.playerName.textContent = "Non connecté";
  elements.playerMoney.textContent = "-- $";
  elements.inventoryList.innerHTML =
    '<li class="list-group-item text-muted">Connectez-vous pour voir votre inventaire.</li>';
  elements.authButtons.innerHTML = `<div class="d-flex justify-content-center gap-2"><button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#authModal"><i class="bi bi-person-circle"></i> Connexion / Inscription</button><button id="store-btn" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#storeModal" disabled><i class="bi bi-shop"></i> Magasin</button></div>`;
  elements.castLineBtn.disabled = true;
  elements.gameStatus.textContent = "Connectez-vous pour jouer !";
}

export function displayInventory(inventory) {
  elements.inventoryList.innerHTML = "";
  if (inventory.length === 0) {
    elements.inventoryList.innerHTML =
      '<li class="list-group-item text-muted">Aucun poisson pour le moment...</li>';
  } else {
    inventory.forEach((poisson) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${poisson.emoji} ${poisson.nom} - ${poisson.valeur}$`;
      elements.inventoryList.appendChild(li);
    });
  }
}

export function showMessage(elementName, message, isSuccess = true) {
  const element = elements[elementName];
  if (element) {
    element.textContent = message;
    element.className = `mt-3 text-center fw-semibold ${
      isSuccess ? "text-success" : "text-danger"
    }`;
    setTimeout(() => {
      element.textContent = "";
    }, 4000);
  }
}
