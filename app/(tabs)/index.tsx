// import { Text, View } from "react-native";
// import {Link} from "expo-router";

// export default function Index() {

//     return (
//     // <View
//     //   style={{
//     //     flex: 1,
//     //     justifyContent: "center",
//     //     alignItems: "center",
//     //   }}
//     // >
//       <View className="flex-1 justify-center items-center">
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//           {/*the text-primary is form extend in tailwind.config.js or u can just put text-blue-500*/}
//         <Text className="text-5xl text-accent font-bold">Hello world! no hi</Text>
//         <Link href="/rewards">Rewards</Link>
//           {/*test*/}
//         <Link href="../authentication/test">test User</Link>
//       </View>
//   );
// }
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { userId } from "@/constants/globals"
import { users } from "@/data/user"
import {fetchUserDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import id from "@/app/voucher/[id]";

export default function Index() {
  // mock data – wire up to your store later
  const points = 420;
  const streakDays = 4;
  const co2SavedKg = 7.8;
  const recent = [
    { id: "1", mode: "Walking", km: 2.1, pts: 12, when: "Today · 5:20 PM" },
    { id: "2", mode: "MRT", km: 8.4, pts: 28, when: "Yesterday · 9:10 AM" },
    { id: "3", mode: "Cycling", km: 3.7, pts: 18, when: "Tue · 7:45 PM" },
  ];

  const user = users.find(u => u.id === userId);


  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Soft gradient header */}
      <LinearGradient
        colors={["#e6f7ef", "#ffffff00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="absolute top-0 left-0 right-0 h-64"
      />
      <SafeAreaView className="flex-1">
        {/* Top bar */}
        <View className="px-5 pt-2 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="h-9 w-9 rounded-2xl bg-green-600/10 items-center justify-center mr-3">
              <MaterialCommunityIcons name="leaf" size={20} />
            </View>
            <Text className="text-2xl font-extrabold text-green-700">
              EcoMotion
            </Text>
          </View>

          <Link href="/profile" asChild>
            <TouchableOpacity className="h-10 w-10 rounded-full bg-black/5 dark:bg-white/10 items-center justify-center">
              <Ionicons name="person-circle-outline" size={26} />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Hero / Points card */}
        <View className="px-5 mt-4">
          <View className="rounded-3xl p-5 bg-green-600">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80">Your Points</Text>
                <Text className="text-white text-4xl font-extrabold mt-1">
                  {user?.points}
                </Text>
              </View>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800&auto=format&fit=crop",
                }}
                className="h-16 w-16 rounded-2xl"
              />
            </View>

            <View className="flex-row gap-3 mt-4">
              <View className="flex-1 rounded-2xl bg-white/15 p-3">
                <Text className="text-white/80">Streak</Text>
                <Text className="text-white font-bold text-xl mt-0.5">
                  {streakDays} days
                </Text>
              </View>
              <View className="flex-1 rounded-2xl bg-white/15 p-3">
                <Text className="text-white/80">CO₂ Saved</Text>
                <Text className="text-white font-bold text-xl mt-0.5">
                  {co2SavedKg} kg
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 mt-4">
              <Link href="/log-trip" asChild>
                <TouchableOpacity className="flex-1 rounded-2xl bg-white p-3 items-center justify-center">
                  <Text className="font-semibold text-green-700">Log Trip</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/rewards" asChild>
                <TouchableOpacity className="flex-1 rounded-2xl bg-white/90 p-3 items-center justify-center">
                  <Text className="font-semibold text-green-700">Rewards</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <View className="px-5 mt-6">
          <Text className="text-base font-semibold mb-3">Quick Actions</Text>
          <View className="grid grid-cols-4 gap-3">
            <Link href="/log-trip" asChild>
              <TouchableOpacity className="items-center">
                <View className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                  <Ionicons name="add-circle-outline" size={22} />
                </View>
                <Text className="text-xs mt-1">Log Trip</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/stats" asChild>
              <TouchableOpacity className="items-center">
                <View className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                  <Ionicons name="stats-chart-outline" size={20} />
                </View>
                <Text className="text-xs mt-1">Stats</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/rewards" asChild>
              <TouchableOpacity className="items-center">
                <View className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                  <Ionicons name="gift-outline" size={20} />
                </View>
                <Text className="text-xs mt-1">Rewards</Text>
              </TouchableOpacity>
            </Link>

            {/* <Link href="/learn" asChild>
              <TouchableOpacity className="items-center">
                <View className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                  <Ionicons name="leaf-outline" size={20} />
                </View>
                <Text className="text-xs mt-1">Learn</Text>
              </TouchableOpacity>
            </Link> */}

            <Link href="/community" asChild>
              <TouchableOpacity className="items-center">
                <View className="h-12 w-12 rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                  <Ionicons name="create-outline" size={20} />
                </View>
                <Text className="text-xs mt-1">Add Community Post</Text>
              </TouchableOpacity>
            </Link>

          </View>
        </View>

        {/* Recent activity */}
        <View className="px-5 mt-6 flex-1">
          <Text className="text-base font-semibold mb-3">Recent Activity</Text>
          <FlatList
            data={recent}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between mb-3 rounded-2xl p-4 bg-black/5 dark:bg-white/10">
                <View className="flex-row items-center">
                  <View className="h-10 w-10 rounded-xl bg-white/70 dark:bg-white/5 items-center justify-center mr-3">
                    <MaterialCommunityIcons
                      name={
                        item.mode === "MRT"
                          ? "train-variant"
                          : item.mode === "Cycling"
                          ? "bike"
                          : "walk"
                      }
                      size={20}
                    />
                  </View>
                  <View>
                    <Text className="font-semibold">{item.mode}</Text>
                    <Text className="text-xs opacity-60">{item.when}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="font-bold">{item.km} km</Text>
                  <Text className="text-xs opacity-60">+{item.pts} pts</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* footer nav links for dev */}
        <View className="px-5 pb-6">
          <View className="flex-row justify-between">
            <Link href="/rewards"><Text className="text-green-700 font-semibold">Rewards</Text></Link>
            <Link href="/authentication/test"><Text className="opacity-70">Test User</Text></Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
