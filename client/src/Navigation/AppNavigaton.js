import React from "react";
import { AuthProvider } from "../context/authContext"; // Asegúrate de que la ruta sea correcta
import AppNavigationDecision from "./appNavigationDesicion";
import Toast from "react-native-toast-message";
import { RootSiblingParent } from "react-native-root-siblings";

export default function AppNavigation() {
  return (
    <AuthProvider>
      <AppNavigationDecision />
      <Toast
        position="top" // o 'bottom'
        topOffset={50} // distancia desde la parte superior
        bottomOffset={40} // distancia desde la parte inferior
        text1Style={{ fontSize: 17, fontWeight: "400"}}
      />
    </AuthProvider>
  );
}
