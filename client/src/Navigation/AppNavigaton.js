import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/Welcome";
import LoginScreen from "../Screens/Login";
import SignupScreen from "../Screens/SignUp";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile";
import BlogScreen from "../Screens/Blog";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Stack que se muestra cuando un usuario no esta registrado o no ha iniciado sesion
//Las pantallas que se veran al inicio y la forma de como se muestran
function StackGroup() {
  return (
    //Contenedor
    <Stack.Navigator initialRouteName="Welcome">
      {/*Pestañas que se muestran y su jeraquia*/}
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false }}
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "checkbox" : "checkbox-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Blog") {
            iconName = focused
              ? "chatbubble-ellipses-sharp"
              : "chatbubble-ellipses-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: "#f97316",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#a78bfa" },
        headerShown: false,
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen
        name="Home"
        screenOptions={{ headerShown: false }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Blog"
        screenOptions={{ headerShown: false }}
        component={BlogScreen}
      />

      <Tab.Screen
        name="Perfil"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  const isAuth = true;
  return isAuth ? (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
}
