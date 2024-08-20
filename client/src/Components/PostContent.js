import React from "react";
import { StyleSheet, View, Image, Text, useColorScheme, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";


const postActions = (comments, likes) => {
  const theme = useColorScheme();
  return (
    <View style={[styles.rowActions, styles.actionBar]}>
      <View style={styles.elemAction}>
        
        <EvilIcons
          style={styles.actionButton}
          name="comment"
          size={21}
          color={theme === "dark" ? "gray" : "#000"}
        />
        
        <Text style={styles.actionText}>{comments}</Text>
      </View>
      <View style={styles.elemAction}>
        <TouchableOpacity onPress={() => console.log("Like")}>
        <EvilIcons
          style={styles.actionButton}
          name="heart"
          size={21}
          color={theme === "dark" ? "gray" : "#000"}
        />
        </TouchableOpacity>
        <Text style={styles.actionText}>{likes}</Text>
      </View>
    </View>
  );
};

const avatar = (author) => {
  const imageUrl = author;
  return <Image style={styles.avatar} source={{ uri: imageUrl }} />;
};

const GrayText = ({ children, numberOfLines, style }) => {
  return (
    <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

const PostContent = ({ post, showComments = false }) => {
  const theme = useColorScheme();
  
  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        {avatar(post.author.avatar)}
        <View style={styles.postContentContainer}>
          <View style={styles.rowTop}>
            <Text
              numberOfLines={1}
              style={[
                styles.header,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
              {post.author.name}
            </Text>
            <GrayText>{"2024-05-16"}</GrayText>
          </View>
          <Text
            style={[
              styles.description,
              { color: theme === "dark" ? "#FFF" : "#000" },
            ]}
          >
            {post.fullText}
          </Text>
          <View style={styles.rowActions}>
            {postActions(post.replyCount, post.favoriteCount)}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    author: {
        flexShrink: 1,
      },
      actionBar: {
        marginTop: 8,
        justifyContent: "flex-start", // Cambiado de space-between a flex-start
        marginRight: 16,
      },
      actionButton: {
        width: 18,
        height: 18,
        marginRight: 8,
      },
      gray: {
        color: "#777",
        fontSize: 13,
        paddingRight: 2,
      },
      avatar: {
        height: 44,
        width: 44,
        borderRadius: 22,
        marginRight: 16,
        flexShrink: 0,
        marginTop: 4,
      },
      header: {
        fontSize: 14,
        fontWeight: "bold",
        paddingBottom: 4,
        paddingRight: 4,
        color: "#000",
      },
      description: {
        fontSize: 14,
        color: "#000",
      },
      singleItem: {
        paddingHorizontal: 16,
        minHeight: 44,
        flex: 1,
        padding: 16,
      },
      rowTop: {
        flexDirection: "row",
      },
      rowActions: {
        flexGrow: 1,
        justifyContent: "flex-start", // Cambiado de space-between a flex-start
        flexDirection: "row",
      },
      row: {
        flexDirection: "row",
      },
      elemAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginRight: 24, // Añadido para dar espacio entre los botones
      },
      actionText: {
        fontSize: 12,
        color: "#444",
      },
      postContentContainer: {
        flexShrink: 1,
        flexGrow: 1,
      },
      commentsContainer: {
        marginTop: 16,
      },
      commentItem: {
        marginBottom: 8,
      },
      commentAuthor: {
        fontWeight: 'bold',
        marginBottom: 2,
      },
      commentContent: {
        fontSize: 14,
      },
    });

export default PostContent;