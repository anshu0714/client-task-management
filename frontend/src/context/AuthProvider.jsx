import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";

import {
  getMeApi,
  loginApi,
  logoutApi,
} from "../features/auth/services/auth.api";

import { setAccessToken, removeAccessToken } from "../services/auth.util";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (payload) => {
    const res = await loginApi(payload);

    setAccessToken(res.data.accessToken);

    setUser(res.data.user);

    return res;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      removeAccessToken();
      setUser(null);
    }
  };

  const fetchMe = async () => {
    try {
      const res = await getMeApi();

      setUser(res.data);
    } catch {
      removeAccessToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      await fetchMe();
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
