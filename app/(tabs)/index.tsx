import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { getTrips, Trip } from "../../lib/storage";

export default function Index() {
    const points = 420;
    const streakDays = 4;
    const co2SavedKg = 7.8;

    const [recent, setRecent] = useState<Trip[]>([]);

    useEffect(() => {
        const loadTrips = async () => {
            const trips = await getTrips();
            setRecent(trips.slice(-3).reverse()); // last 3 trips, newest first
        };
        loadTrips();
    }, []);

    const TRANSPORT_COLORS: Record<string, string> = {
        Walking: "#4CAF50",
        Biking: "#4CAF50",
        "Public Transport": "#FFC107",
        Driving: "#9E9E9E",
    };

    return (
        <View className="flex-1 bg-white dark:bg-black">
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

                {/* Points card */}
                <View className="px-5 mt-4">
                    <View className="rounded-3xl p-5 bg-green-600">
                        <View className="flex-row items-center justify-between">
                            <View>
                                <Text className="text-white/80">Your Points</Text>
                                <Text className="text-white text-4xl font-extrabold mt-1">
                                    {points}
                                </Text>
                            </View>
                            <Image
                                source={{
                                    uri: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800&auto=format&fit=crop",
                                }}
                                className="h-16 w-16 rounded-2xl"
                            />
                        </View>

                        {/* Stats row */}
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
                    </View>
                </View>

                {/* Recent Activity below Points card */}
                {recent.length > 0 && (
                    <View className="px-5 mt-6">
                        <Text className="text-base font-semibold mb-3">Recent Activity</Text>
                        {recent.map((item) => (
                            <View
                                key={item.id}
                                className="flex-row items-center justify-between mb-3 rounded-2xl p-4 bg-black/5 dark:bg-white/10"
                            >
                                <View className="flex-row items-center">
                                    <View
                                        className="h-10 w-10 rounded-xl items-center justify-center mr-3"
                                        style={{
                                            backgroundColor: TRANSPORT_COLORS[item.transportType] || "#72bf6a",
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={
                                                item.transportType === "Walking"
                                                    ? "walk"
                                                    : item.transportType === "Biking"
                                                        ? "bike"
                                                        : item.transportType === "Public Transport"
                                                            ? "bus"
                                                            : "car"
                                            }
                                            size={20}
                                            color="white"
                                        />
                                    </View>
                                    <View>
                                        <Text className="font-semibold">
                                            Trip on {new Date(item.startedAt).toLocaleDateString()}
                                        </Text>
                                        <Text className="text-xs opacity-60">
                                            {new Date(item.startedAt).toLocaleTimeString()} • {item.transportType}
                                        </Text>
                                    </View>
                                </View>
                                <View className="items-end">
                                    <Text className="font-bold">{item.points} pts</Text>
                                    <Text className="text-xs opacity-60">
                                        {Math.round(
                                            (new Date(item.endedAt).getTime() - new Date(item.startedAt).getTime()) /
                                            60000
                                        )}{" "}
                                        min
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* Quick actions on the same line */}
                <View className="px-5 mt-6 flex-row justify-between">
                    <Link href="/new" asChild>
                        <TouchableOpacity className="items-center flex-1 mx-1">
                            <View className="h-12 w-full rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                                <Ionicons name="add-circle-outline" size={22} />
                            </View>
                            <Text className="text-xs mt-1 text-center">Log Trip</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/tracking" asChild>
                        <TouchableOpacity className="items-center flex-1 mx-1">
                            <View className="h-12 w-full rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                                <Ionicons name="stats-chart-outline" size={20} />
                            </View>
                            <Text className="text-xs mt-1 text-center">Stats</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/rewards" asChild>
                        <TouchableOpacity className="items-center flex-1 mx-1">
                            <View className="h-12 w-full rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                                <Ionicons name="gift-outline" size={20} />
                            </View>
                            <Text className="text-xs mt-1 text-center">Rewards</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/community" asChild>
                        <TouchableOpacity className="items-center flex-1 mx-1">
                            <View className="h-12 w-full rounded-2xl bg-black/5 dark:bg-white/10 items-center justify-center">
                                <Ionicons name="create-outline" size={20} />
                            </View>
                            <Text className="text-xs mt-1 text-center">Add Post</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </SafeAreaView>
        </View>
    );
}
