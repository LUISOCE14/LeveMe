import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react'

export default function EditTask({
    complete,
    descripcion,
    id,
    title
}){
    return(
        <View className="flex flex-row  rounded-md bg-gray-300 p-4 mt-4 items-center shadow-inner">
            <View className=" w-72 justify-start items-start" ><Text className=" text-center text-lg  ">{title}</Text></View>
            <View><TouchableOpacity><MaterialIcons name="delete" size={27} color="black" /></TouchableOpacity></View>
        </View>
    );
};