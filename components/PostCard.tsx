import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import type { Post } from "../app/(tabs)/community";

export function PostCard({ post, onLike }: { post: Post; onLike: () => void }) {
  const when = new Date(post.createdAt).toLocaleString();
  return (
    <View className="mb-4 rounded-3xl overflow-hidden bg-white dark:bg-black shadow-sm">
      <View className="px-4 py-3 flex-row items-center justify-between">
        <View>
          <Text className="font-semibold">{post.user}</Text>
          <Text className="text-xs opacity-60">{when}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={18} />
      </View>

      <Image source={{ uri: post.uri }} className="w-full h-56" />

      {post.text ? <Text className="px-4 py-3">{post.text}</Text> : null}

      <View className="px-4 pb-4 flex-row items-center">
        <TouchableOpacity onPress={onLike} className="flex-row items-center mr-4">
          <Ionicons name="heart-outline" size={20} />
          <Text className="ml-1">{post.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={20} />
          <Text className="ml-1">Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
