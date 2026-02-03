import React, {
  createContext,
  ReactNode,
  useLayoutEffect,
  useState,
} from "react";

import * as SecureStore from "expo-secure-store";

const STORE_KEY = "token";

interface AuthContextType {
  token: string | null;
  setToken: (s: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenBasic] = useState<string | null>(null);
  const isAuthenticated = Boolean(token);

  useLayoutEffect(() => {
    const fetchToken = async () => {
      const result = await SecureStore.getItemAsync(STORE_KEY);
      if (result) {
        setTokenBasic(result);
      } else {
        setTokenBasic("");
      }
    };

    fetchToken();
  }, []);

  const setToken = (s: string) => {
    setTokenBasic(s);
    SecureStore.setItemAsync(STORE_KEY, s);
  };

  const logout = () => {
    setTokenBasic("");
    SecureStore.deleteItemAsync(STORE_KEY);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
