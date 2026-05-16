const API_URL = "http://localhost:8080/api";
const TOKEN_KEY = "finance_dashboard_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const buildHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

export const signup = async (payload) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const login = async (payload) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: buildHeaders(),
  });

  return parseResponse(response);
};

export const fetchTransactions = async () => {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: buildHeaders(),
  });

  return parseResponse(response);
};
