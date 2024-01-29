import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import Interes from '../Components/ButtonInteres'
import { useNavigation } from "@react-navigation/native";


export default function Profile() {
  return (
    <View className="flex-1 bg-blue-400/100 container">
      <SafeAreaView className="flex ">
        <View className="flex-col  justify-start items-center mb-14 ">
        <Avatar.Text size={100} label="XD" />
        <Text className="text-black text-4xl mt-5"> Luis Ocegueda</Text>
        <Text className="text-2xl">@LuisOce</Text>
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-white px-2 pt-8 mx-auto container "
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        <Text className="text-lg text-center">Intereses</Text>
        <View className="mb-5 flex-row flex-wrap  ">
              <Interes  texto={"Deportes"}/>
              <Interes  texto={"Ciclismo"}/>
              <Interes  texto={"Deportes"}/>
              <Interes  texto={"dsfgdsefgdfhdfgsdhf"}/>
              <Interes  texto={"Deportes"}/>
              <Interes  texto={"Deportes"}/>
              
              
        </View>
        <TouchableOpacity className="bg-orange-400/100  p-4 rounded-3xl ">
            <Text className="font-bold text-center text-black ">Cambiar Intereses</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-orange-400/100  p-4 rounded-3xl mt-3" onPress={()=> console.log('Biens') }>
          <Text className="font-bold text-center text-black">Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
}
