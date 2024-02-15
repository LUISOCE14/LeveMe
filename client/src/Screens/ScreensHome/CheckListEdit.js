import { View, Text, TouchableOpacity,FlatList } from "react-native";
import React from "react";
import EditTask from "../../Components/EditTask";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonPer from '../../Components/ButtonPersonalizado'

const CheckListEdit = ({ route }) => {
  const navigation = useNavigation();
  const activities = route.params.activities;

  return (
    <View className="flex-1 bg-neutral-100">
      <SafeAreaView>
        {/**Botones de regreso y Guardar */}
        <View className="flex-row  space-x-48">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-orange-500 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-orange-500 px-7 py-2 rounded-xl" onPress={console.log('')}>
            <Text className="font-semibold text-center">Guardar</Text>
          </TouchableOpacity>
        </View>


{/**Checar */}
        <View className=" mt-1 mb-1 bg-neutral-100" style={{ height: 550 }}>
          <FlatList
            data={activities}
            renderItem={({ item }) => (
              <EditTask {...item}  />
            )}
            keyExtractor={item => item.id.toString()}
            className="p-3"
          />
        </View>
          <ButtonPer ruta={'AddActivities'} text={'Agregar Actividades'} />

      </SafeAreaView>
    </View>
  );
};

export default CheckListEdit;
