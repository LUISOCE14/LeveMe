import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dialog,Button } from "@rneui/themed";

export default function EditTask({
  complete,
  descripcion,
  id,
  title,
  toggleDelete,
}) {
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <View
      className="flex-row items-center justify-between mb-5 bg-white p-3 rounded-xl "
      key={id}
    >
      <Text className=" text-center text-lg  ">{title}</Text>
      <TouchableOpacity onPress={() => console.log("Eewrwrewr")}>
        <MaterialIcons
          name="delete"
          size={35}
          color="grey"
          onPress={() => toggleDialog()}
        />
        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
          <Dialog.Title title="Actividad" />
          <View className="flex-col">
            <Text className="text-center text-lg">
              Seguro que quieres eliminar la actividad?
            </Text>
            <View className="flex-row  items-center mt-5 justify-between">
            <Button
              title="Eliminar"
              type="clear"
              titleStyle={{ color: "red",fontSize:20 }} 
              onPress={() => toggleDelete(id) }
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
      </TouchableOpacity>
    </View>
  );
}