import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Post from "../../Components/Post";
import { tweets } from "./tweets";
import { Divider, FAB } from "@rneui/base";

export default function Feed() {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(tweets);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className=" mb-0.5">
        <Text className="text-center font-bold text-2xl mb-3">Feed</Text>
        <Divider />
      </View>
      <FlatList
        data={posts.slice(0, 30)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        ListHeaderComponentStyle={{ backgroundColor: "#ccc" }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      <FAB
        icon={{ name: "add", color: "white" }}
        color="#f97316"
        onPress={() => navigation.navigate("CreatePost")}
        size="large"
        style={styles.addButton}
      />
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
