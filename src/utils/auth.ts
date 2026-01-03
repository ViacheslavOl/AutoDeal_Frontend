const AUTH_STORAGE_KEY = "auth_token";
const AUTH_EVENT = "auth-change";

const emitAuthChange = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_STORAGE_KEY);
};

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_STORAGE_KEY, token);
  emitAuthChange();
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
  emitAuthChange();
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const subscribeAuthChange = (listener: () => void) => {
  if (typeof window === "undefined") return () => undefined;

  const handler = () => listener();
  window.addEventListener(AUTH_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(AUTH_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
};
