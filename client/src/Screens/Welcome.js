import { View, Text,TouchableOpacity,Image,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ButtonPer from '../Components/ButtonPersonalizado'


export default function Welcome() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1  bg-purple-400"  >
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


        <View className="">
          <ButtonPer ruta={'Login'} text={'Login'}/>
          <ButtonPer  ruta={'Signup'} text={'Signup'}/>
        </View>
      </View>
      <StatusBar />
    </SafeAreaView>
  )
}