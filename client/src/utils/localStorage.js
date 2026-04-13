const USER_KEY = "shopzen_user";
const TOKEN_KEY = "shopzen_token";

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (_error) {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

export const storeAuthSession = ({ user, token }) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthSession = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};
