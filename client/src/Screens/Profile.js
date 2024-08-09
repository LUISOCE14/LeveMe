import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-toast-message";
import { Chip } from "@rneui/themed";

const FILENAME = "profilepic.jpg";
const API_Url = process.env.API_URL;

export default function Profile() {
  const { logout, token, idUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [intereses, setIntereses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const exists = await FileSystem.getInfoAsync(
          FileSystem.documentDirectory + FILENAME
        );
        try {
          const response = await axios.get(
            `${API_Url}/api/user/obtenerPerfilUsuario/${idUser}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const datosPerfil = response.data.user;
          const status = response.status;
          if (status === 200) {
            setIntereses(datosPerfil.intereses);
            setUser({ ...datosPerfil, intereses: undefined });
            if (exists.exists) {
              setPhoto(exists.uri);
            } else {
              setPhoto(datosPerfil.avatar);
            }
          }
        } catch (error) {
          const errorMessage = error.response.data.message || error.message;
          console.error(error);
          Toast.show({
            type: "error",
            text1: errorMessage,
            visibilityTime: 2000, // milisegundos
            autoHide: true,
          });
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [idUser, photo]) // Asegúrate de incluir todas las dependencias aquí
  );

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: 1,
      quality: 1,
    });
    if (!result.canceled) {
      let fotoPerfil = result.assets[0].uri;
      SaveImageLocal(fotoPerfil);
    } else {
      Toast.show({
        type: "error",
        text1: "No se seleccionó ninguna imagen.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  };

  const SaveImageLocal = async uri => {
    const existingImagePath = `${FileSystem.documentDirectory}${FILENAME}`;
    const newPath = `${FileSystem.documentDirectory}${FILENAME}`;

    // Verificar si ya existe una imagen
    const exists = await FileSystem.getInfoAsync(existingImagePath);

    if (exists.exists) {
      // Si existe, elimina la imagen antigua
      await FileSystem.deleteAsync(existingImagePath);
      console.log("Imagen antigua eliminada.");
    }

    try {
      // Copia la nueva imagen
      await FileSystem.copyAsync({
        from: uri,
        to: newPath,
      }).then(() => {
        setPhoto(newPath); // Actualiza el estado con la nueva ruta de la imagen
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Hubo un error al actualizar la imagen.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
      return;
    } finally {
      setPhoto(newPath); // Actualiza el estado con la nueva ruta de la imagen
      Toast.show({
        type: "success",
        text1: "Imagen actualizada correctamente.",
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    }
  };

  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner size={80} color="#0000ff" visible={loading} />
        </View>
      ) : (
        <View className="flex-1 container bg-purple-400">
          {/**Contiene toda la informacion del usuario como nombre y usuario */}
          <SafeAreaView className="flex ">
            <View className="flex-col  justify-start items-center mb-7 ">
              <Avatar
                size={100}
                rounded
                source={{ uri: photo }}
                title="Avatar de Usuario"
              >
                <Avatar.Accessory size={28} onPress={() => selectPhoto()} />
              </Avatar>
              <Text className="text-black text-4xl mt-5">
                {user.nombreCompleto}
              </Text>
              <Text className="text-2xl">@LuisOce</Text>
            </View>
          </SafeAreaView>

          {/**Esta view contiene los intereses y los botones */}
          <View
            className="flex-1 bg-neutral-200 px-2 pt-5 mx-auto container "
            style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
          >
            {/**Este es el componente para mostrar los botones con los interes  */}
            <Text className="text-2xl text-center mb-5"> Tus Intereses</Text>
            {intereses.length > 0 ? (
              <>
                <ScrollView>
                  <View className="flex-row flex-wrap justify-center items-center">
                    {intereses.map(item => (
                      <View key={item._id} className="m-2">
                        <Chip title={item.nombre} key={item._id} />
                      </View>
                    ))}
                  </View>
                </ScrollView>
                {/**Este view contiene los botones de cerrar sesion y cambiar interes */}

                <TouchableOpacity className="bg-orange-500 mx-7  p-3 rounded-xl ">
                  <Text
                    className="font-semibold text-center text-black text-base "
                    onPress={() =>
                      navigation.navigate("SelectInterest", {
                        userId: idUser,
                        interesesUser: intereses,
                      })
                    }
                  >
                    Cambiar Intereses
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-orange-500  p-3 rounded-xl mt-3 mx-7 mb-4"
                  onPress={() => logout()}
                >
                  <Text className="font-semibold text-center text-black text-base">
                    Cerrar sesion
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View className=" h-80 justify-center">
                  <Text className="text-2xl text-center">
                    Aún no hay intereses 😞
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-orange-500 mx-7  p-4 rounded-xl "
                  onPress={() => navigation.navigate("SelectInterest")}
                >
                  <Text className="font-semibold text-center text-black text-lg ">
                    Agregar Intereses 😊
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
}
