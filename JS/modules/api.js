//Stock toutes les requêtes API
const API_URL =
  "[https://la-peche-du-capitaine-roro-backend.onrender.com](https://la-peche-du-capitaine-roro-backend.onrender.com)";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    let errorMsg = "Une erreur serveur est survenue.";
    try {
      const errorData = await response.json();
      errorMsg = errorData.msg || errorMsg;
    } catch (e) {}
    throw new Error(errorMsg);
  }
  return response.json();
}

export function registerUser(pseudo, password) {
  return request("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudo, password }),
  });
}

export function loginUser(pseudo, password) {
  return request("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudo, password }),
  });
}

export function fetchInventory(token) {
  return request("/api/game/inventory", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function fish(token) {
  return request("/api/game/fish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}
