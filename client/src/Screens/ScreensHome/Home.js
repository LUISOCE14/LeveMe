import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext, useCallback } from "react";
import Task from "../../Components/Task";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, FAB } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "../../context/authContext";

export default function Home() {
  const [activities, setActivities] = useState([
  ]);

  function toggleTodo(id) {
    setActivities(
      activities.map(activity =>
        activity.id === id
          ? {
              ...activity,
              completed: activity.completed === true ? false : true,
            }
          : activity
      )
    );
  }

  const navigation = useNavigation();

  const handleEdit = () => {
    navigation.navigate("CheckListEdit", { activities });
  };

  return (
    <View className="flex-1" style={styles.color}>
      <SafeAreaView>
        {/* En este view se crea el boton de editar*/}
        <View className="flex-row items-center justify-between mb-2">
          <Text className="font-bold text-start text-2xl  ml-4 ">
            Lista de Actividades
          </Text>
          {/* Botón de edición con ícono */}
          <TouchableOpacity
            onPress={handleEdit}
            className="bg-orange-500 rounded-full px-3 py-3 mr-3  "
          >
            <MaterialIcons name="edit" size={15} color="black" />
          </TouchableOpacity>
        </View>
        {/* Aqui se cargan todas las actividades */}
        <View style={{ height: "82%" }}>
          {activities.length === 0 ? (
            <View className="flex-1 flex-col items-center justify-center">
              <Text className="text-center text-3xl font-bold">
                No hay actividades, agrega algunas nuevas!
              </Text>
              <Text className="text-sm text-center p-1 ">
                Puedes usar el botón "Agregar Actividad(+)" para agregar nuevas.                
              </Text>
            </View>
          ) : (
            <>
              <View className="flex-row  justify-center">
                <Text className="text-sm text-center">
                  Tienes{" "}
                  {activities.filter(activity => !activity.completed).length}{" "}
                  actividades por completar
                </Text>
              </View>
              <FlatList
                data={activities}
                renderItem={({ item }) => (
                  <Task {...item} toggleTodo={toggleTodo} />
                )}
                keyExtractor={item => item.id.toString()}
                className="p-3"
              />
            </>
          )}
        </View>
        {/*El siguiente View es donde se muestra el progreso */}
        {activities.length <= 0 ? (
          <View
            className="h-20 flex-row justify-around items-center pb-3"
            style={styles.color}
          >
            <View style={styles.buttonShadow}>
              <Button
                title="Progreso"
                buttonStyle={{
                  backgroundColor: "#007BFF",
                  width: "100%",
                  borderRadius: 60,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Progress")}
              />
            </View>

            <View style={styles.buttonShadow}>
              <FAB
                size="medium"
                icon={{
                  name: "add",
                  color: "black",
                }}
                buttonStyle={{
                  backgroundColor: "#f97316",
                }}
                onPress={() => navigation.navigate("AddActivities")}
              />
            </View>
          </View>
        ) : (
          <View
            className="h-20  items-center justify-center pb-3"
            style={styles.color}
          >
            <View style={styles.buttonShadow}>
              <Button
                title="Progreso"
                buttonStyle={{
                  backgroundColor: "#007BFF",
                  width: "100%",
                  borderRadius: 60,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                }}
                titleStyle={{ color: "black", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Progress")}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
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
