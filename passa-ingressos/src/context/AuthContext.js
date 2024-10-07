import { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("@PermissionPI:token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token };
    }

    return {};
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post("/Acesso/Login", {
      Login: username,
      Senha: password,
    });

    const { token } = response.data;

    setToken(token);

    localStorage.setItem("@PermissionPI:token", token);
    api.defaults.headers.authorization = `Bearer ${token}`;
  }, []);

  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@PermissionPI:token");
    return !!token;
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, userLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };