import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Interes from "../Components/ButtonInteres";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Avatar } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Spinner from "react-native-loading-spinner-overlay";

const FILENAME = "profilepic.jpg";

export default function Profile() {
  const { logout, token, idUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [intereses, setIntereses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const exists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + FILENAME);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/user/obtenerPerfilUsuario/${idUser}`,
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
          }else{
          setPhoto(datosPerfil.avatar);
          }
        }
      } catch (error) {
        const errorMessage = error.response.data.msg || error.message;
        console.error(error);
        Toast.show({
          type: ALERT_TYPE.ERROR,
          textBody: errorMessage,
          textBodyStyle: { textAlign: "center", fontSize: 16 },
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        type: ALERT_TYPE.ERROR,
        textBody: "No se seleccionó ninguna imagen",
        textBodyStyle: { textAlign: "center", fontSize: 20 },
        autoClose: 3000,
      });
    }
  };

  const SaveImageLocal = async uri => {
    const existingImagePath = `${FileSystem.documentDirectory}${FILENAME}`;
    const newPath = `${FileSystem.documentDirectory}${FILENAME}`;

    // Verificar si ya existe una imagen
    const exists = await FileSystem.getInfoAsync(existingImagePath);

    if (exists) {
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
        type: ALERT_TYPE.ERROR,
        textBody: "Hubo un problema al actualizar la imagen",
        textBodyStyle: { textAlign: "center", fontSize: 20 },
        autoClose: 3000,
      });
      return;
    } finally{
      setPhoto(newPath) // Actualiza el estado con la nueva ruta de la imagen
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        textBody: "Imagen actualizada correctamente",
        textBodyStyle: { textAlign: "center", fontSize: 20 },
        autoClose: 3000,
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
            className="flex-1 bg-neutral-100 px-2 pt-5 mx-auto container "
            style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
          >
            {/**Este es el componente para mostrar los botones con los interes  */}
            <Text className="text-2xl text-center mb-5">Intereses</Text>
            {intereses.length > 0 ? (
              <>
                <ScrollView>
                  <View className="flex-row flex-wrap justify-center items-center">
                    {intereses.map((item, idx) => (
                      <Interes id={idx} interes={item} />
                    ))}
                  </View>
                </ScrollView>
                {/**Este view contiene los botones de cerrar sesion y cambiar interes */}

                <TouchableOpacity className="bg-orange-500 mx-7  p-3 rounded-xl ">
                  <Text className="font-semibold text-center text-black text-base ">
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
                <TouchableOpacity className="bg-orange-500 mx-7  p-4 rounded-xl ">
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
