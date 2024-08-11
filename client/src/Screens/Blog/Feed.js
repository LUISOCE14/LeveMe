import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';


export default function Feed() {
  return (
    <View className="items-center bg-zinc-50">
    <Ionicons name="person" size={50} color={"black"} />
    </View>
  )
}