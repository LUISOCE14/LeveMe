import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

//screen para hacer el registro de un nuevo cliente
export default function SignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => {
    // Expresión regular para validar un correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Correo electrónico inválido', 'Por favor, ingrese una dirección de correo electrónico válida.');
      return;
    }

    if (password.length < 7) {
      Alert.alert('Contraseña inválida', 'La contraseña debe tener al menos 7 caracteres.');
      return;
    }

    // Lógica de inicio de sesión si la validación pasa
    // Aquí puedes hacer la llamada a la API o la lógica de autenticación

    Alert.alert('Inicio de sesión exitoso', 'Bienvenido!');
  };


  return (
    <View className="flex-1 bg-purple-400">
      <SafeAreaView className="flex ">
        <View className="flex-row  justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>

        <View className=" flex-row justify-center p-10">
          <Text className="text-black font-bold text-6xl ">Leve</Text>
          <Text className=" font-bold text-orange-500 text-6xl ">Me</Text>
          <Image
            source={require("../Assets/Icons/megafonoN.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2 ">
          
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Full Name"

          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 "
              secureTextEntry
              placeholder="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="font-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <AntDesign name="google" size={35} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
            <FontAwesome5 name="facebook" size={35} color="purple" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
