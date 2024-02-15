import NavigationApp from "./src/Navigation/AppNavigaton"
import React from "react";
import { NativeWindStyleSheet } from "nativewind";


NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <NavigationApp />
  );
}




