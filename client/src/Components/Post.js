import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import PostContent from "./PostContent";

const Post = ({ post }) => {
  const  navigation  = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { post });
      }}
    >
      <PostContent post={post} />
    </Pressable>
  );
};

export default Post;