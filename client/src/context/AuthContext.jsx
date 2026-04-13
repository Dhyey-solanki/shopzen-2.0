import { createContext, useEffect, useState } from "react";

import {
  clearAuthSession,
  getStoredToken,
  getStoredUser,
  storeAuthSession,
} from "../utils/localStorage";
import {
  fetchCurrentUser,
  loginUser as loginRequest,
  registerUser as registerRequest,
} from "../services/authService";
import { fetchMyProfile } from "../services/userService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [loading, setLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const syncUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchCurrentUser();
        setUser(response.user);
        storeAuthSession({ user: response.user, token });
      } catch (_error) {
        clearAuthSession();
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    syncUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await loginRequest(credentials);
    setUser(response.user);
    setToken(response.token);
    storeAuthSession(response);
    return response;
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    setUser(response.user);
    setToken(response.token);
    storeAuthSession(response);
    return response;
  };

  const logout = () => {
    clearAuthSession();
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  const refreshUser = async () => {
    const response = await fetchMyProfile();
    setUser(response.user);
    storeAuthSession({ user: response.user, token });
    return response.user;
  };

  const updateUser = (nextUser) => {
    setUser(nextUser);
    storeAuthSession({ user: nextUser, token });
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user && token),
    isAdmin: user?.role === "admin",
    loading,
    login,
    register,
    logout,
    refreshUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
