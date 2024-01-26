import { View, Text, SafeAreaView,Image, ScrollView } from 'react-native'
import React from 'react'


export default function Profile() {
  return (
    <ScrollView>
    <SafeAreaView className=" bg-red-800">
    <View className="justify-center items-center  bg-slate-500 flex-1">
        
        <Image
            source={require("../Assets/Icons/megafono.png")}
            style={{ width: 150, height: 150 }}
          />
    </View>
    </SafeAreaView>
    </ScrollView>
  )
}