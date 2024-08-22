import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import PostContent from "./PostContent";

const Post = ({ post,addLike }) => {
  const  navigation  = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", { post });
      }}
    >
      <PostContent post={post} addLike={addLike} />
    </Pressable>
  );
};

export default Post;