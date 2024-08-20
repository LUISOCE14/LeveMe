import { View, Text,StyleSheet } from "react-native";
import React, { useState, useContext } from "react";
import { Dialog, Button } from "@rneui/themed";
import { AuthContext } from "../context/authContext";
import { MaterialIcons } from "@expo/vector-icons";
export default function DialogFraseCompletada({
  visible,
  toggleDialog,
  items,
}) {
  const { porcentajeCompletado } = useContext(AuthContext);
  const { mensajeAleatorio, porcentaje } = porcentajeCompletado(items);
  const getStarts = () => {
    if (porcentaje >= 0 && porcentaje <= 30) {
      return 1;
    } else if (porcentaje > 30 && porcentaje <= 70) {
      return 2;
    } else if (porcentaje > 70 && porcentaje <= 100) {
      return 3;
    } else {
      return 1;
    }
  };

  const Starts = getStarts();

  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={() => toggleDialog("completada")}
      overlayStyle={styles.dialog}
    >
      <Dialog.Title
        title={`!Felicidades!`}
        titleStyle={styles.title}
      />
      <Text
        style={styles.text}
      >
        {mensajeAleatorio}
      </Text>
      <View className=" flex-row items-center justify-center space-x-2 mt-3">
        {Array.from({ length: Starts }, (_, i) => (
          <MaterialIcons key={i} name="star" size={40} color="#f97316" />
        ))}
      </View>
    </Dialog>
  );
}


const styles = StyleSheet.create({
  dialog:{
    backgroundColor: "#E6E6FA",
    borderRadius: "20px",
    shadowColor: "#000000",
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  title:{
    color: "#333333",
    fontSize: 20,
    fontFamily: "roboto",
  },
  text:{
    color: "#666666",
    fontSize: 20,
    fontFamily: "roboto",
  },
});