import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import validator from "validator";
import { AuthContext } from "../../context/authContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import axios from "axios";

//screen para hacer el registro de un nuevo cliente
export default function SignUp() {
  const { register } = useContext(AuthContext);
  const navigation = useNavigation();
  const [correo, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [nombre, setNombre] = useState("");

  //Funcion para el registro de un nuevo usuario
  const validaciones = () => {
    // Verificar si el campo de correo electrónico está vacío
    if (nombre.trim().length === 0) {
      Toast.show({
        textBody: "Por favor ingrese su nombre.",
        textBodyStyle: {
          fontSize: 16,
          textAlign: "center",
          paddingTop: 4,
          color: "#FF6961",
        },
        autoClose: 2000,
      });
      return;
    }

    if (edad.trim().length === 0 || edad < 15) {
      Toast.show({
        textBody: "Debes ser mayor de 15 años.",
        textBodyStyle: {
          fontSize: 16,
          textAlign: "center",
          paddingTop: 4,
          color: "#FF6961",
        },
        autoClose: 2000,
      });
      return;
    }
    if (!validator.isEmail(correo)) {
      Toast.show({
        textBody: "El correo electrónico que ingresaste no es válido",
        textBodyStyle: {
          fontSize: 16,
          textAlign: "center",
          paddingTop: 4,
          color: "#FF6961",
        },
        autoClose: 2000,
      });
      return;
    }
    // Verificar si el campo de contraseña está vacío
    if (validator.isEmpty(password)) {
      Toast.show({
        textBody: "Por favor ingresa una contraseña.",
        textBodyStyle: { fontSize: 16, textAlign: "center", color: "#FF6961" },
        autoClose: 2000,
      });
      return;
    } else if (password.length < 6) {
      Toast.show({
        textBody: "La contraseña debe de contener mas de 6 caracteres",
        textBodyStyle: { fontSize: 16, textAlign: "center", color: "#FF6961" },
        autoClose: 2000,
      });
      return;
    }
    handleRegister();
  };

  const handleRegister = async () => { 
    try {
      const response = await axios.post('', {
        nombreCompleto: nombre,
        edad: edad,
        email: correo,
        password: password,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      const status = response.status;
      if (data.token && status === 200) {
        register(data.token, data.idUser, data.success);
      }

    } catch (error) {
      const errorMessage = error.response.data.msg || "Ocurrió un error inesperado";
        Toast.show({
          type: ALERT_TYPE.ERROR,
          textBody: errorMessage,
          textBodyStyle: {textAlign: "center", fontSize: 16},  
          autoClose: 3000,
        });
    }



  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                source={require("../../Assets/Icons/megafonoN.png")}
                style={{ width: 30, height: 30 }}
              />
            </View>
          </SafeAreaView>

          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <View className="form space-y-2 ">
              <Text className="text-gray-700 ml-4">Nombre Completo:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Ingresa tu nombre completo"
                value={nombre}
                onChangeText={text => setNombre(text)}
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Edad:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="Ingresa tu edad"
                value={edad}
                onChangeText={text => setEdad(text)}
                keyboardType="number-pad"
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Correo:</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                placeholder="ingresa tu correo"
                value={correo}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                blurOnSubmit
              />
              <Text className="text-gray-700 ml-4">Contraseña:</Text>

              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 "
                secureTextEntry
                placeholder="Mayor a 6 caracteres"
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                className="py-3 bg-orange-500 rounded-xl"
                onPress={() => validaciones()}
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7">
              <Text className="text-gray-500 font-semibold">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-orange-500"> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}
