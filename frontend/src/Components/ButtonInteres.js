import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonInteres = ({texto}) => {
      return (
    <View className="rounded-3xl p-3 h-11 mr-2 mt-2 border border-blue-600" style={{width: texto.length*12}}>
        <Text className="text-center font-bold">{texto}</Text>
    </View>
  )
};


export default ButtonInteres