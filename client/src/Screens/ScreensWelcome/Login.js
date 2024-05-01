import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("")

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

        <View className="justify-center items-center">
          <Image
            source={require("../../Assets/Icons/megafonoN.png")}
            style={{ width: 150, height: 150, marginLeft: 40 }}
          />
        </View>

        <View className=" flex-row justify-center ">
          <Text className="text-black font-bold text-6xl ">Leve</Text>
          <Text className=" font-bold text-orange-500 text-6xl ">Me</Text>
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-white px-8 pt-8 "
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        
          <View className="form space-y-2">
            <Text className="ml-4 text-gray-700">Email</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              onChangeText={setCorreo}
              value={correo}
              placeholder="Enter Email"
             
              
            ></TextInput>

            <Text className="ml-4 text-gray-700">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="Enter Password"
            ></TextInput>

            <TouchableOpacity className="flex items-end  mb-5">
              <Text className="text-orange-400 mt-1 font-semibold">
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity   className="bg-orange-500 rounded-3xl py-4 active:bg-blue-700 " onPress={()=>console.log(password)}>
              <Text className="text-center text-gray-800 font-bold font-xl">
                
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        
        <Text className="text-xl py-5 text-center font-bold">Or</Text>

        <View className="flex-row justify-center space-x-9">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl active:bg-blue-700">
            <AntDesign name="google" size={35} color="#c084fc" />
          </TouchableOpacity>
         
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have a account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text className="text-orange-400 ml-1  font-semibold">Sing Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar />
    </View>
  );
}
