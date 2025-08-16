export async function handleFish() {
  if (!token) {
    afficherMessage(
      messageBoxEl,
      "Vous devez être connecté pour pêcher.",
      false
    );
    return;
  }
  castLineBtn.disabled = true;
  castLineBtn.innerHTML =
    '<span class="spinner-border spinner-border-sm"></span> Pêche en cours...';
  gameStatusEl.textContent = "La ligne est dans l'eau...";
  try {
    const response = await fetch(`${API_URL}/api/game/fish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    afficherMessage(messageBoxEl, data.msg, true);
    if (data.poisson) {
      currentUser.argent = data.nouvelArgent;
      localStorage.setItem("user", JSON.stringify(currentUser));
      playerMoneyEl.textContent = `${currentUser.argent} $`;
      await fetchInventory();
    }
  } catch (error) {
    afficherMessage(messageBoxEl, error.message, false);
  } finally {
    castLineBtn.disabled = false;
    castLineBtn.textContent = "Lancer la ligne";
    gameStatusEl.textContent = "Prêt à pêcher !";
  }
}

async function fetchInventory() {
  if (!token) return;
  try {
    const response = await fetch(`${API_URL}/api/game/inventory`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const inventory = await response.json();
    inventoryListEl.innerHTML = "";
    if (inventory.length === 0) {
      inventoryListEl.innerHTML =
        '<li class="list-group-item text-muted">Aucun poisson pour le moment...</li>';
    } else {
      inventory.forEach((poisson) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${poisson.emoji} ${poisson.nom} - ${poisson.valeur}$`;
        inventoryListEl.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'inventaire:", error);
  }
}