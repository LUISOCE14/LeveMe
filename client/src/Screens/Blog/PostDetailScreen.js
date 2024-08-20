import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import PostContent from "../../Components/PostContent";
import { Divider } from "@rneui/base";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Comment from "../../Components/comment";
import { comments } from "./comments";

const PostDetailScreen = () => {
  const {
    params: { post },
  } = useRoute();
  const [newComment, setNewComment] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const navigation = useNavigation();

  const handleAddComment = async () => {
    if (newComment.trim().length === 0) return console.warn("Comentario vacío");
    setIsPublishing(true);

    // Aquí iría la lógica para enviar el comentario a tu backend
    console.log("Nuevo comentario:", newComment);

    // Simular una acción asíncrona
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsPublishing(false);
    setNewComment("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="ml-1"
              >
                <AntDesign name="left" size={25} color="black" />
              </TouchableOpacity>
              <View className="flex-grow justify-center items-center pr-8">
                <Text className="text-black text-xl font-bold">
                  Detalles del Post
                </Text>
              </View>
            </View>
            <Divider />
            <PostContent post={post} />
            <Divider />
            <View style={styles.commentsSection}>
              <Text style={styles.commentsSectionTitle}>Comentarios</Text>
            </View>
          </>
        )}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <Divider />}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity
          onPress={handleAddComment}
          style={[
            styles.sendButton,
            isPublishing ? styles.sendButtonDisabled : null,
          ]}
          disabled={isPublishing}
        >
          {isPublishing ? (
            <ActivityIndicator size="small" color="#F97316" />
          ) : (
            <Feather name="send" size={24} color="#F97316" />
          )}
        </TouchableOpacity>
      </View>
      {isPublishing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1DA1F2" />
          <Text style={styles.loadingText}>Publicando...</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: "15%",
  },
  flatListContent: {
    flexGrow: 1,
  },
  commentsSection: {
    padding: 16,
  },
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentItem: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DA1F2",
    marginTop: 12,
  },
});

export default PostDetailScreen;
