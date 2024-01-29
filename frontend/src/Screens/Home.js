import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

export default function Home() {
  return (
    <View className="justify-center items-center">
        <SafeAreaView className="flex">
        <Image
            source={require("../Assets/Icons/megafono.png")}
            style={{ width: 150, height: 150 }}
          />
        </SafeAreaView>
    </View>
  )
}