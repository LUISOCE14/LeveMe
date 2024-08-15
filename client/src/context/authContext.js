import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { mensajes } from "./mensajes";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSelectedInterests, setHasSelectedInterests] = useState(false);
  const [token, setToken] = useState("");
  const [idUser, setIdUser] = useState("");
  const [authOrigin, setAuthOrigin] = useState("");
  const [activities, setActivities] = useState([]);
  const [nombreUser, setNombreUsuario] = useState("");

  const login = (receivedToken, dataUser, success) => {
  
    setIsAuthenticated(success);
    setToken(receivedToken);
    setIdUser(dataUser.id);
    setNombreUsuario(dataUser.nombre);
    setNombreUsuario();
    setAuthOrigin("login");
  };
  const porcentajeCompletado = actividades => {
    const totalActividades = actividades.length;

    if (totalActividades === 0)
      return "Aún no has registrado actividades. ¡Empieza con una pequeña meta hoy!";

    const completadas = actividades.filter(
      actividad => actividad.completada == true
    ).length;
   


    const porcentaje = (completadas / totalActividades) * 100;

    // Encuentra el objeto correspondiente al rango de porcentaje
    const mensajeObj = mensajes.find(msg => porcentaje >= msg.min && porcentaje <= msg.max);

    // Si no se encuentra un objeto para el porcentaje, devolver un mensaje predeterminado
    if (!mensajeObj) return "No se pudo encontrar un mensaje para este porcentaje.";

    // Selecciona un mensaje aleatorio de la lista de textos
    const mensajesPosibles = mensajeObj.texts;
    const mensajeAleatorio = mensajesPosibles[Math.floor(Math.random() * mensajesPosibles.length)];

    return {mensajeAleatorio, porcentaje};
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
        porcentajeCompletado,
        nombreUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
