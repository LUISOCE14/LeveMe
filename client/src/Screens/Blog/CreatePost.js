import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Divider, FAB } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function CreatePost() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const MAX_CHARACTERS = 280;


  const handlePostCreation = async () => {
    if (text.trim().length === 0) return console.warn("El texto no puede estar vacío");
    setIsPublishing(true);

    // Aquí puedes agregar la lógica para enviar la publicación al servidor
    console.log('Texto de la publicación:', text);

    // Simular una acción asíncrona
    await new Promise((resolve) => setTimeout(resolve, 9000));

    setIsPublishing(false);
    navigation.goBack();
  };

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="flex flex-row justify-between items-center mb-6 ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-1"
          >
            <AntDesign name="close" size={30} color="black" />
          </TouchableOpacity>
          <View className="flex-grow justify-center items-center pr-8">
            <Text className="text-black text-2xl font-bold">Crear Post</Text>
          </View>
        </View>
        <Divider />

        <ScrollView style={{ backgroundColor: "#E8EAED" }}>
          <View className="flex-row items-center mb-2 ml-2 mt-2">
            <Avatar
              size={44}
              rounded
              source={{ uri: "https://picsum.photos/id/237/200/300" }}
            />
            <Text className="ml-2 text-lg font-semibold pb-2">
              Luis Ocegueda
            </Text>
          </View>
          <TextInput
            multiline
            numberOfLines={10}
            placeholder="Escribe algo..."
            value={text}
            onChangeText={setText}
            className=" h-40 p-4 text-gray-700 ml-10 mr-4 "
          />
            <View style={styles.characterCounter}>
            <Text style={styles.characterCounterText}>
              {text.length}/{MAX_CHARACTERS}
            </Text>
          </View>
        </ScrollView>
        {isPublishing && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Publicando...</Text>
        </View>
      )}
        <FAB
          title="Publicar"
          style={styles.addButton}
          color="#3b82f6"
          onPress={() => handlePostCreation()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5, // Solo para Android
  },
  characterCounter: {
    alignItems: 'flex-end',
    paddingBottom: 5,
    marginRight: 5
  },
  characterCounterText: {
    fontSize: 14,
    color: '#666666',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
});
