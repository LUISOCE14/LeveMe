import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dialog,Button } from "@rneui/themed";

export default function EditTask({
  _id,
  actividad,
  toggleDelete,
}) {
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <View
      className="flex-row items-center justify-between mb-5 bg-white p-3 rounded-xl "
      key={_id}
    >
      <Text className=" text-center text-lg  ">{actividad}</Text>
      <TouchableOpacity>
        <MaterialIcons
          name="delete"
          size={25}
          color="grey"
          onPress={() => toggleDialog()}
        />
      </TouchableOpacity>
       <Dialog isVisible={visible} onBackdropPress={toggleDialog}
       overlayStyle={styles.dialog}
       >
          <Dialog.Title title="Actividad" titleStyle={styles.title} />
          <View className="flex-col">
            <Text className="text-center" style={styles.text}>
              Seguro que quieres eliminar la actividad?
            </Text>
            <View className="flex-row  items-center mt-5 justify-between">
            <Button
              title="Eliminar"
              type="clear"
              titleStyle={{ color: "red",fontSize:20 }} 
              onPress={() => toggleDelete(_id) }
            />
             <Button
              title="Cancelar"
              type="clear"
              titleStyle={{ color: "#3b82f6",fontSize: 20 }}
              onPress={() => toggleDialog() }
            />
            </View>
          </View>
        </Dialog>
    </View>
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