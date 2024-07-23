import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSelectedInterests, setHasSelectedInterests] = useState(false);
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState("");
  const [authOrigin, setAuthOrigin] = useState("");

  const login = (receivedToken, receivedIdUser, success) => {
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(receivedIdUser);
    setAuthOrigin("login");
  };

  const register = (receivedToken, receivedIdUser, success) => {
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(receivedIdUser);
    setHasSelectedInterests(true);
    setAuthOrigin("register");
  };

  const selectInterests = () => {
    setHasSelectedInterests(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    setIdUser("");
  };

  // Función para verificar la expiración del token
  const checkTokenExpiration = () => {
    if (!token) return; // No hay token para verificar

    // Suponiendo que el token es un JWT y quieres verificar la expiración
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    if (decodedToken.exp < currentTime) {
      logout(); // Cierra la sesión si el token ha expirado
    }
  };

  // Ejecuta checkTokenExpiration cada minuto
  useEffect(() => {
    const timer = setInterval(checkTokenExpiration, 60000); // 60000 milisegundos = 1 minuto

    return () => clearInterval(timer); // Limpiar el intervalo cuando el componente se desmonte
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        hasSelectedInterests,
        authOrigin,
        token,
        idUser,
        login,
        register,
        logout,
        selectInterests,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
