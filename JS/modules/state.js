export const state = {
  currentUser: null,
  token: null,
  inventory: [],
};

export function setUser(user, tokenStr) {
  state.currentUser = user;
  state.token = tokenStr;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", tokenStr);
}

export function clearUser() {
  state.currentUser = null;
  state.token = null;
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
