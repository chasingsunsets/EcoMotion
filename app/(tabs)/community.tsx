import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostCard } from "../../components/PostCard";

export type Post = {
  id: string;
  uri: string;      // image URI (local or remote)
  text: string;
  createdAt: number;
  likes: number;
  user: string;
};

const STORAGE_KEY = "ecomotion_posts_v1";

export default function Community() {
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: Post[] = JSON.parse(raw);
          setPosts(parsed.sort((a, b) => b.createdAt - a.createdAt));
        } else {
          // seed demo posts
          const seed: Post[] = [
            {
              id: "p2",
              uri: "https://images.unsplash.com/photo-1523419409543-41baf2d22a4d?q=80&w=800&auto=format&fit=crop",
              text: "Group ride to Marina Bay! 🚴‍♀️",
              createdAt: Date.now() - 3600_000,
              likes: 12,
              user: "Aisha",
            },
            {
              id: "p1",
              uri: "https://images.unsplash.com/photo-1508606572321-901ea443707f?q=80&w=800&auto=format&fit=crop",
              text: "Walked 5km instead of taking a grab today.",
              createdAt: Date.now() - 7200_000,
              likes: 7,
              user: "Ray",
            },
          ];
          setPosts(seed);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow photo library access to upload.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled && res.assets?.length) {
      setImageUri(res.assets[0].uri);
    }
  };

  const submitPost = async () => {
    if (!imageUri && !text.trim()) {
      Alert.alert("Add something", "Choose a photo or write a caption.");
      return;
    }
    const newPost: Post = {
      id: Math.random().toString(36).slice(2),
      uri:
        imageUri ||
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
      text: text.trim(),
      createdAt: Date.now(),
      likes: 0,
      user: "You",
    };
    const next = [newPost, ...posts];
    setPosts(next);
    setText("");
    setImageUri(null);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const toggleLike = async (id: string) => {
    const next = posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setPosts(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <SafeAreaView className="flex-1">
      {/* Composer */}
      <View className="px-5 py-3 border-b border-black/10 dark:border-white/10">
        <Text className="text-2xl font-extrabold text-green-700">Community</Text>

        <View className="mt-3 rounded-3xl bg-black/5 dark:bg-white/10 p-3">
          {imageUri ? (
            <TouchableOpacity onPress={() => setImageUri(null)}>
              <Image source={{ uri: imageUri }} className="w-full h-40 rounded-2xl mb-2" />
            </TouchableOpacity>
          ) : null}

          <TextInput
            placeholder="Share your eco trip..."
            value={text}
            onChangeText={setText}
            multiline
            className="bg-white dark:bg-black rounded-2xl px-4 py-3"
          />

          <View className="flex-row justify-between items-center mt-3">
            <TouchableOpacity onPress={pickImage} className="flex-row items-center">
              <Ionicons name="image-outline" size={22} />
              <Text className="ml-2 font-medium">Add Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={submitPost} className="rounded-2xl bg-green-600 px-4 py-2">
              <Text className="text-white font-semibold">Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        renderItem={({ item }) => <PostCard post={item} onLike={() => toggleLike(item.id)} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
      />
    </SafeAreaView>
  );
}
