import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getTrips, Trip } from "../../lib/storage";

const TRANSPORT_COLORS: Record<string, string> = {
    Walking: "#4CAF50",
    Biking: "#4CAF50",
    "Public Transport": "#FFC107",
    Driving: "#9E9E9E",
};

export default function TripHistory() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadTrips = async () => {
            const data = await getTrips();
            setTrips(data);
        };
        loadTrips();
    }, []);

    return (
        <FlatList
            data={trips}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            ListHeaderComponent={<Text style={styles.header}>Trip History</Text>}
            ListEmptyComponent={<Text style={{ marginTop: 16 }}>No trips logged yet.</Text>}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.tripCard}
                    onPress={() => router.push(`/tracking/${item.id}`)}
                >
                    <Text style={styles.tripTitle}>
                        {new Date(item.startedAt).toLocaleString()}
                    </Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Transport:</Text>
                        <View
                            style={[
                                styles.badge,
                                { backgroundColor: TRANSPORT_COLORS[item.transportType] || "#72bf6a" },
                            ]}
                        >
                            <Text style={styles.badgeText}>{item.transportType}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Points:</Text>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: TRANSPORT_COLORS[item.transportType] || "#72bf6a",
                            }}
                        >
                            {item.points}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Duration:</Text>
                        <Text style={styles.value}>
                            {Math.round(
                                (new Date(item.endedAt).getTime() - new Date(item.startedAt).getTime()) / 60000
                            )}{" "}
                            min
                        </Text>
                    </View>

                    {item.hasSpeedViolations && (
                        <View style={[styles.badge, { backgroundColor: "red", marginTop: 8 }]}>
                            <Text style={styles.badgeText}>Speed Violation!</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    tripCard: {
        backgroundColor: "#f9f9f9",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    tripTitle: { fontWeight: "bold", marginBottom: 8, fontSize: 16 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    label: { fontWeight: "600", width: 100, color: "#555" },
    value: { fontWeight: "bold", fontSize: 16 },
    badge: {
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: { color: "#fff", fontWeight: "bold" },
});
