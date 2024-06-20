import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {React, useContext, useEffect} from 'react'
import WelcomeScreen from "../Screens/ScreensWelcome/Welcome";
import LoginScreen from "../Screens/ScreensWelcome/Login";
import SignupScreen from "../Screens/ScreensWelcome/SignUp"
import { AuthContext } from "../context/authContext";

const Stack = createNativeStackNavigator();


//Stack que se muestra cuando un usuario no esta registrado o no ha iniciado sesion
//Las pantallas que se veran al inicio y la forma de como se muestran
export default function StackGroupWelcome() {
  const navigation = useNavigation();
  const { isAuthenticated, authOrigin, hasSelectedInterests } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated && authOrigin === 'login') {
      navigation.navigate('Home');
    } else if (isAuthenticated && authOrigin === 'register' &&!hasSelectedInterests) {
      navigation.navigate('Interests');
    } else if (isAuthenticated && authOrigin === 'register' && hasSelectedInterests) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated, authOrigin, hasSelectedInterests, navigation]);


    return (
      //Contenedor
      <Stack.Navigator initialRouteName="Welcome">
        {/*Pestañas que se muestran y su jeraquia*/}  
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