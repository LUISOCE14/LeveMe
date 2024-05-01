import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ButtonInteres = ({ id, interes }) => {
  return (
    <view
      className="rounded-2xl p-3 h-10 mr-1 mt-3 bg-slate-300"
      style={{ width: interes.length * 13 }}
    >
      <Text className="text-center ">{interes} </Text>
    </view>
  );
};

export default ButtonInteres;
