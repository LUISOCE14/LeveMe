import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/Welcome";
import LoginScreen from "../Screens/Login";
import SignupScreen from "../Screens/SignUp";
import HomeScreen from "../Screens/Home";
import ProfileScreen from "../Screens/Profile"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Stack que se muestra cuando un usuario no esta registrado o no ha iniciado sesion
//Las pantallas que se veran al inicio y la forma de como se muestran
function StackGroup() {
  return (
    //Contenedor
    <Stack.Navigator initialRouteName="Welcome">
      {/*Pestañas que se muestran y su jeraquia*/ }
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
};

function TabGroup(){
  return(
    <Tab.Navigator>
      <Tab.Screen 
      name="Home" 
      screenOptions={{ headerShown: false }}
      options={{
        tabBarIcon: () => <Entypo name="home" size={24} color="black" />

      }}
      component={HomeScreen}/>
      <Tab.Screen 
      name="Profile" 
      options={{ headerShown: false }}
      component={ProfileScreen}/>
    </Tab.Navigator>

  );
};



export default function AppNavigation() {
    const isAuth = false
  return (
       isAuth ? <NavigationContainer><TabGroup /></NavigationContainer>:<NavigationContainer><StackGroup /></NavigationContainer>
  );
}
