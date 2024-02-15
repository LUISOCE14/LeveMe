import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import ProfileScreen from "../Screens/Profile";
import BlogScreen from "../Screens/Blog";
import StackHome from './StackNavigationHome'

const Tab = createBottomTabNavigator();


//Pila de pantallas que se muestran en la barra de navegacion de la aplicacion
export default function TabGroupHome() {
    return (
      <Tab.Navigator
      //Aqui estamos definiendo las configuraciones de nuestro TabBar
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
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
            // Aqui retorna los iconos que se muestran en los elementos de TabBar
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
          component={StackHome}
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