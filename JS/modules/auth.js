import { setUser, clearUser, state } from "/state.js";
import { loginUser, registerUser, fetchInventory } from "/api.js";
import {
  updateUIForLoggedInUser,
  updateUIForLoggedOutUser,
  showMessage,
  displayInventory,
} from "/ui.js";

export async function handleLogin(e) {
  e.preventDefault();
  const pseudo = document.getElementById("login-pseudo").value;
  const password = document.getElementById("login-password").value;
  try {
    const data = await loginUser(pseudo, password);
    setUser(data.user, data.token);
    await onLoginSuccess();
    bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
  } catch (error) {
    showMessage("loginMessage", error.message, false);
  }
}

export async function handleRegister(e) {
  e.preventDefault();
  const pseudo = document.getElementById("register-pseudo").value;
  const password = document.getElementById("register-password").value;
  try {
    const data = await registerUser(pseudo, password);
    showMessage(
      "registerMessage",
      data.msg + " Vous pouvez maintenant vous connecter.",
      true
    );
    e.target.reset();
  } catch (error) {
    showMessage("registerMessage", error.message, false);
  }
}

export function handleLogout() {
  clearUser();
  updateUIForLoggedOutUser();
}

export function handleTwitchCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const twitchToken = urlParams.get("token");
  const twitchUserString = urlParams.get("user");

  if (twitchToken && twitchUserString) {
    const twitchUser = JSON.parse(decodeURIComponent(twitchUserString));
    setUser(twitchUser, twitchToken);
    onLoginSuccess();
    window.history.replaceState({}, document.title, "/");
  }
}

export function checkLoginStatus() {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  if (storedToken && storedUser) {
    setUser(JSON.parse(storedUser), storedToken);
    onLoginSuccess();
  } else {
    updateUIForLoggedOutUser();
  }
}

async function onLoginSuccess() {
  updateUIForLoggedInUser(state.currentUser);
  const inventory = await fetchInventory(state.token);
  displayInventory(inventory);
}
