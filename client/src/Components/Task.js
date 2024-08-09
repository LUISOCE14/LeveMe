import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox, Icon } from "@rneui/themed";

export default function Task({
  id,
  title,
  description,
  completed,
  toggleTodo,
}) {
  return (
    <View className="flex-row items-center justify-between mb-5 bg-white p-3 rounded-xl " key={id}>
      <Text className=" text-center text-lg  ">{title}</Text>
      <CheckBox
        checked={completed}
        onPress={() => toggleTodo(id)}
        checkedColor="#f97316"
        uncheckedColor="#007BFF"
        size={30}
        containerStyle={{
          padding: 1,
        }}
      />
    </View>
  );
}





