const TOKEN_KEY = "auth:token";
const RESET_EMAIL_KEY = "auth:resetEmail";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => Boolean(getToken());

export const setResetEmail = (email) => {
  localStorage.setItem(RESET_EMAIL_KEY, email);
};

export const getResetEmail = () => localStorage.getItem(RESET_EMAIL_KEY);

export const clearResetEmail = () => {
  localStorage.removeItem(RESET_EMAIL_KEY);
};
