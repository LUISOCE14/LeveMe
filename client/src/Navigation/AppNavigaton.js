import React from "react";
import { AuthProvider } from "../context/authContext"; // Asegúrate de que la ruta sea correcta
import AppNavigationDecision from "./appNavigationDesicion";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function AppNavigation() {
  return (
    <AuthProvider>
      <AlertNotificationRoot >
        <AppNavigationDecision />
      </AlertNotificationRoot>
    </AuthProvider>
  );
}
