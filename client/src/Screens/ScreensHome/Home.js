import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Task from "../../Components/Task"
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Hacer ejercicio",
      description: "Ir al gimnasio o hacer ejercicio en casa.",
      completed: false,
    },
    {
      id: 2,
      title: "Leer un libro",
      description: "Dedicar 30 minutos a la lectura diaria.",
      completed: true,
    },
    {
      id: 3,
      title: "Aprender React Native",
      description:
        "Realizar tutoriales y prácticas para mejorar habilidades en React Native.",
      completed: false,
    },
    {
      id: 4,
      title: "Preparar cena saludable",
      description: "Cocinar una cena equilibrada y nutritiva.",
      completed: false,
    },
    {
      id: 5,
      title: "Llamar a un amigo",
      description: "Mantenerse en contacto con amigos y familiares.",
      completed: true,
    },
    {
      id: 6,
      title: "Llamar a un amigo",
      description: "Mantenerse en contacto con amigos y familiares.",
      completed: true,
    },
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
    navigation.navigate('CheckListEdit', { activities });
  };

  return (
    <View className="flex-1 bg-neutral-100 ">
      <SafeAreaView>
        {/* En este view se crea el boton de editar*/}
        <View className="flex-row  justify-end mr-5 mt-3">
          <TouchableOpacity
            onPress={handleEdit}
            className="bg-orange-500 px-7 py-2 rounded-xl flex-row "
          >
            <Text className="font-semibold text-center">Editar</Text>
            <MaterialIcons name="edit" size={15} color="black" />
          </TouchableOpacity>
        </View>

        <Text className="font-bold text-start text-2xl mt-2 ml-4 ">
          Lista de Actividades
        </Text>
        {/* Aqui se cargan todas las actividades */}
        <View className=" mb-5" style={{ height: 370 }}>
          <FlatList
            data={activities}
            renderItem={({ item }) => (
              <Task {...item} toggleTodo={toggleTodo} />
            )}
            keyExtractor={item => item.id.toString()}
            className="p-3"
          />
        </View>
        {/*El siguiente View es donde se muestra el progreso */}
        <View className="">
          <View className=" justify-center h-60 flex-row items-center">
            <TouchableOpacity
              className=" justify-start items-start"
            >
              <AntDesign name="doubleleft" size={100} color={'black'} />
            </TouchableOpacity>

            <TouchableOpacity>
              <AntDesign name="doubleright" size={100} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
