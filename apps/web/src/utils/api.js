import { getToken } from "./auth.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const request = async (path, { method = "GET", body, headers } = {}) => {
  const token = getToken();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = {};
  try {
    payload = await response.json();
  } catch (error) {
    payload = {};
  }

  if (!response.ok || payload.success === false) {
    const message = payload.message || "Request failed";
    const err = new Error(message);
    err.status = response.status;
    err.data = payload.data;
    throw err;
  }

  return payload;
};

export const post = (path, body) => request(path, { method: "POST", body });
export const get = (path) => request(path, { method: "GET" });
