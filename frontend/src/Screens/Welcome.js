import { View, Text,TouchableOpacity,Image,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white" style={{backgroundColor: "#33adff"}}  >
      <View className="flex-1 flex justify-center my-4 mb-8 " style={{backgroundColor: "#33adff"}}>
        <View className=" flex-row justify-center bottom-1 shadow-lg shadow-orange-500/50">
          <Text className="text-black font-bold text-4xl ">Leve</Text>
          <Text className=" font-bold text-orange-500 text-4xl">Me</Text>
          <Image
            source={require("../Assets/Icons/megafono.png")}
            style={{ width: 22, height: 22}}
          />
          
        </View>
        <Text
          className="text-black font-bold text-2xl text-center">
          Let's Get Started!
        </Text>


        <View className="space-y-4 top-10">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="py-3 bg-orange-500 mx-7 rounded-xl ">
            <Text
              className="text-xl font-bold text-center text-black"
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')} 
            className="py-3 bg-orange-500 mx-7 rounded-xl ">
            <Text
              className="text-xl font-bold text-center text-black"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar />
    </SafeAreaView>
  )
}