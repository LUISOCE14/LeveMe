import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import AddTask from "../../Components/AddTasks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Button, FAB, Dialog } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import { data } from "./data";

export default function AddActivities() {
  const navigation = useNavigation();
  const [actividadesAgenda, setActividadesAgenda] = useState([]);
  const [visible, setVisible] = useState(false);
  const [task, setTask] = useState("");
  const palabrasProhibidas = [
    "sexo",
    "sex",
    "drogas",
    "alcohol",
    "aroma",
    "intoxicación",
    "joder",
    "masturbación",
    "puta",
    "criko",
    "drogarme",
    "foco",
    "matar",
    "murder",
    "maltrato",
    "abusar",
  ];

  const toggleDialog = () => {
    setVisible(!visible);
  };
  // Función para verificar palabras prohibidas
  function contienePalabrasProhibidas(texto) {
    const regex = new RegExp(
      palabrasProhibidas
        .map((palabra) => palabra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "gi"
    );
    return regex.test(texto);
  }

  const handleAddTask = (activity, origen) => {
    if (origen === "pred") {
      if (actividadesAgenda === undefined || actividadesAgenda.length === 0) {
        setActividadesAgenda([{ actividad: activity, completed: false }]);
      } else {
        let existe = actividadesAgenda.some(
          (item) => item.actividad === activity
        );
        if (existe) {
          let newActividadesAgenda = actividadesAgenda.filter(
            (item) => item.actividad !== activity
          );
          setActividadesAgenda(newActividadesAgenda);
        } else {
          setActividadesAgenda([
            ...actividadesAgenda,
            { actividad: activity, completed: false },
          ]);
        }
      }
    } else if (origen === "personal") {
      if (contienePalabrasProhibidas(activity)) {
        Toast.show({
          text1: "La actividad contiene palabras prohibidas o antisonantes.",
          type: "error",
          visibilityTime: 2000, // milisegundos
          zIndex: 15000, // Un valor mayor que el zIndex del diá
        });
        setTask("");
        return;
      } else if (task === "") {
        Toast.show({
          text1: "Por favor, ingrese una actividad.",
          type: "error",
          visibilityTime: 2000, // milisegundo
        });
        return;
      }
      if (actividadesAgenda === undefined || actividadesAgenda.length === 0) {
        setActividadesAgenda([{ actividad: activity, completed: false }]);
      } else {
        setActividadesAgenda([
          ...actividadesAgenda,
          { actividad: activity, completed: false },
        ]);
        data.push(activity);
        setTask("");
        toggleDialog();
      }
    }
  };

  const handleSaveActivities = () => {
    if (actividadesAgenda.length === 0) {
      Toast.show({
        text1: "No has agregado ninguna actividad.",
        type: "error",
        visibilityTime: 2000, // milisegundos
      });
      return;
    }

    try {
      console.log("Guardando actividades...");
    } catch (error) {
      const errorMessage =
        error.response.data.msg || "Ocurrió un error inesperado";
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      Toast.show({
        type: "success",
        text1: "Actividades guardadas exitosamente.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
    navigation.navigate("Home");
  };

  return (
    <View className="flex-1" style={styles.color}>
      <SafeAreaView>
        <View className="flex-row space-x-56">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: "86%" }} className="p-1">
          <Text className=" text-center text-xl font-semibold pb-2">
            Recomendacion de actividades segun tus intereses
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const existe = actividadesAgenda.some(
                (i) => i.actividad === item
              );
              if (existe) {
                return (
                  <AddTask
                    actividad={item}
                    handleAddTask={handleAddTask}
                    isAddTask={true}
                  />
                );
              } else {
                return (
                  <AddTask
                    actividad={item}
                    handleAddTask={handleAddTask}
                    isAddTask={false}
                  />
                );
              }
            }}
          />
        </View>
        <View
          className="h- flex-row justify-around items-center pb-3"
          style={styles.color}
        >
          <View style={styles.buttonShadow}>
            <Button
              title="Personalizar Actividad"
              buttonStyle={{
                backgroundColor: "#007BFF",
                width: "100%",
                borderRadius: 60,
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              onPress={() => toggleDialog()}
            />
          </View>

          <View style={styles.buttonShadow}>
            <FAB
              size="medium"
              icon={{
                name: "send",
                color: "black",
              }}
              buttonStyle={{
                backgroundColor: "#f97316",
              }}
              onPress={() => handleSaveActivities()}
            />
          </View>
        </View>
      </SafeAreaView>
      {/**Modal para añadir una actividad Personalizada */}
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Añadir actividad" />
        <View className="flex-col">
          <Text className="text-center text-lg">
            Agrega la activida de tu agrado.
          </Text>
          <View className=" flex-col  items-center mt-5 justify-between">
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              onChangeText={setTask}
              value={task}
              placeholder="Ingresa la actividad personalizada"
            ></TextInput>
            <Button
              title="Agregar"
              type="clear"
              buttonStyle={{ paddingTop: 20 }}
              titleStyle={{ color: "red", fontSize: 20 }}
              onPress={() => handleAddTask(task, "personal")}
            />
          </View>
        </View>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    backgroundColor: "#E8EAED",
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 7.4,
    elevation: 5, // Solo para Android
  },
});
