import NavigationApp from "./frontend/src/Navigation/AppNavigaton";
import React from "react";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <NavigationApp />
    </PaperProvider>
  );
}
