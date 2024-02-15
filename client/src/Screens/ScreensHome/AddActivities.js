import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import ButtonPers from '../../Components/ButtonPersonalizado';
import { Entypo } from '@expo/vector-icons';

export default function AddActivities() {
    const navigation = useNavigation();
  return (
    <View className="flex-1">
      <SafeAreaView>
      <View className="flex-row space-x-56">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-500 px-7 py-2 rounded-full" onPress={console.log('')}>
          <Entypo name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className=" p-2 " style={{height: 550}}>
            <Text className=" text-center text-xl font-semibold">Recomendacion de actividades segun tus intereses</Text>
            <FlatList />
        </View>
        <ButtonPers ruta={' '} text={'Guardar'}/>
      </SafeAreaView>
    </View>
  )
}