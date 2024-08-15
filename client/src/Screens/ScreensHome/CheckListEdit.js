import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
import EditTask from "../../Components/EditTask";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/themed";
import Toast from "react-native-toast-message";
import AddTask from "../../Components/AddTasks";

const API_Url = process.env.API_URL;

const CheckListEdit = ({ route }) => {
  const navigation = useNavigation();
  const { idAgenda } = route.params;
  const [activities, setActivities] = useState(route.params.activities);
  const completadas = activities.filter((activity) => activity.completed).length === activities.length ? true : false;
  console.log(idAgenda);

  const toggledelete = async id => {
    try {
      const response = await axios.delete(`${API_Url}/api/agendas/EliminarActividad/${idAgenda}/${id}`);
      const msg = response.data.msg;
      const status = response.status;
      if (status === 200) {
        setActivities(activities.filter(activity => activity._id!== id));
        Toast.show({
          type: "success",
          text1: msg,
          visibilityTime: 2000, // milisegundos
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("Error al eliminar la actividad", error);
      const errorMessage =
        error.response.data.msg || "Ocurrió un error inesperado";
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  }

  return (
    <View className="flex-1" style={styles.colorMain}>
      <SafeAreaView>
        {/**Botones de regreso y Guardar */}
        <View className="flex flex-row justify-between items-center mb-5">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-1"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>

          {/* Contenedor para el texto */}
          <View className="flex-grow justify-center items-center">
            <Text className="text-black text-2xl font-bold">
              Editar Actividades
            </Text>
          </View>
        </View>

        {/* Aqui se cargan todas las actividades */}
        <View style={{ height: "41%" }}>
          {activities.length === 0  || completadas ? (
            <Text style={{ textAlign: "center", marginTop: 100 }}>
              No hay actividades agregadas
            </Text>
          ) : (
            <>
              <FlatList
                data={activities}
                renderItem={({ item }) => {
                  if (item.completada == false) {
                    return (<EditTask {...item} toggleDelete={toggledelete} />)
                  } else {
                    return null;
                  }
                }}
                keyExtractor={item => item._id.toString()}
                className="p-3"
              />
            </>
          )}
        </View>
        <View style={{height: "41%"}}>
              <Text className="text-center text-2xl">
                  Actividades Recomendadas
              </Text>
        </View>
        <View
          className="h-20 flex-row items-center justify-center"
          style={styles.color}
        >
          <View style={styles.buttonShadow}>
            <Button
              title="Guardar"
              buttonStyle={{
                backgroundColor: "#FFF",
                width: "100%",
                borderRadius: 60,
                paddingVertical: 15,
                paddingHorizontal: 15,
              }}
              titleStyle={{ color: "black", fontWeight: "bold" }}
              onPress={() => navigation.navigate("AddActivities")}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  colorMain: {
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

export default CheckListEdit;
