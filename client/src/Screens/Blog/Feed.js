import React, { useState, useCallback, useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Post from "../../Components/Post";
import { Divider, FAB } from "@rneui/base";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Toast from "react-native-toast-message";
import Esqueleto from "../../Components/SqueletonFeed";

const API_Url = process.env.API_URL;

export default function Feed() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const { idUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (idUser) fetchPosts();
    }, [idUser])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${API_Url}/api/posts/MostrarTodosLosPosts`
      );
      const data = response.data;
      const estatus = response.status;

      if (estatus === 200 && data.length > 0) {
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 2000, // milisegundos
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = (idPost, idUser) => {
    const postIndex = posts.findIndex(p => p.post.id === idPost);
  
    if (postIndex !== -1) {
      const updatedPosts = [...posts];
      const post = updatedPosts[postIndex];
  
      // Asegúrate de que likesArray es siempre un array
      if (!Array.isArray(post.post.likes)) {
        post.post.likes = [];  // Si no es un array, inicialízalo como uno vacío
      }
  
      const likesArray = post.post.likes;
  
      // Verifica si el idUser ya ha dado like
      const existe = likesArray.includes(idUser);
  
      if (existe) {
        post.post.likes = likesArray.filter(id => id !== idUser);
        post.post.megusta = post.post.megusta === 0 ? 0 : post.post.megusta - 1;
      } else {
        post.post.likes.push(idUser);
        post.post.megusta += 1;
      }
  
      // Actualiza el estado de 'posts'
      setPosts(updatedPosts);
    }
  };

  const addLike = async idPost => {
    handleLikeToggle(idPost);
    try {
      const response = await axios.post(`${API_Url}/api/posts/AgregarLike`, {
        idUser,
        idPost: idPost,
      });
      const data = response.data;
    } catch (error) {
      console.error(error, "aqui");
      const errorMessage = error.response.data.msg || error.message;
      Toast.show({
        type: "error",
        text2: errorMessage,
        visibilityTime: 8000, // milisegundos
        autoHide: true,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" mb-0.5">
        <Text className="text-center font-bold text-2xl mb-3">Feed</Text>
        <Divider />
      </View>
      {loading ? (
        <Esqueleto />
      ) : (
        <>
          <FlatList
            data={posts}
            keyExtractor={item => item.post.id}
            renderItem={({ item }) => <Post post={item} addLike={addLike} />}
            ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
            ItemSeparatorComponent={() => <Divider />}
          />
          <FAB
            icon={{ name: "add", color: "white" }}
            color="#f97316"
            onPress={() => navigation.navigate("CreatePost")}
            size="large"
            style={styles.addButton}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
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
