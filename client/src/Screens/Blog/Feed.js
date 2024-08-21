import React, {
  useState,
  useCallback,
  useContext,
} from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
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
    },[idUser])
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
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" mb-0.5">
        <Text className="text-center font-bold text-2xl mb-3">Feed</Text>
        <Divider />
      </View>
      {loading ?(
        <Esqueleto />
      ):(
        <>
      <FlatList
        data={posts}
        keyExtractor={item => item.post.id}
        renderItem={({ item }) => <Post post={item} />}
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
