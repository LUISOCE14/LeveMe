import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabGroupHome from "./TabNavigationApp";
import StackGroupWelcome from "./StackScreenWelcome";


export default function AppNavigation() {
  const isAuth = true;
  return (
    <NavigationContainer>
      {isAuth ? <TabGroupHome /> : <StackGroupWelcome />}
    </NavigationContainer>
  )
};
