import { apiFetch, setAuthToken } from "./api";

export async function registerUser(name: string, email: string, password: string) {
  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  setAuthToken(data.token);
  return data;
}

export async function loginUser(email: string, password: string) {
  const res = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  setAuthToken(data.token);
  return data;
}
