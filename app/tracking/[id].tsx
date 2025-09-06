import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { getTripById, Trip } from "../../lib/storage";

const TRANSPORT_COLORS: Record<string, string> = {
    Walking: "#4CAF50",
    Biking: "#4CAF50",
    "Public Transport": "#FFC107",
    Driving: "#9E9E9E",
};

export default function TripDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        const loadTrip = async () => {
            const data = await getTripById(id);
            if (data) setTrip(data);
        };
        loadTrip();
    }, [id]);

    if (!trip) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#72bf6a" />
                <Text>Loading trip...</Text>
            </View>
        );
    }

    const initialRegion = {
        latitude: trip.locations[0].latitude,
        longitude: trip.locations[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>
                Trip on {new Date(trip.startedAt).toLocaleString()}
            </Text>

            <View style={styles.infoCard}>
                <View style={styles.row}>
                    <Text style={styles.label}>Transport:</Text>
                    <View
                        style={[
                            styles.badge,
                            { backgroundColor: TRANSPORT_COLORS[trip.transportType] || "#72bf6a" },
                        ]}
                    >
                        <Text style={styles.badgeText}>{trip.transportType}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Points:</Text>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            color: TRANSPORT_COLORS[trip.transportType] || "#72bf6a",
                        }}
                    >
                        {trip.points}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Duration:</Text>
                    <Text style={styles.value}>
                        {Math.round(
                            (new Date(trip.endedAt).getTime() - new Date(trip.startedAt).getTime()) / 60000
                        )}{" "}
                        min
                    </Text>
                </View>

                {trip.hasSpeedViolations && (
                    <View style={[styles.badge, { backgroundColor: "red", marginTop: 8 }]}>
                        <Text style={styles.badgeText}>Speed Violation!</Text>
                    </View>
                )}
            </View>

            <View style={styles.mapContainer}>
                <MapView style={styles.map} initialRegion={initialRegion}>
                    <Polyline
                        coordinates={trip.locations}
                        strokeColor={trip.hasSpeedViolations ? "red" : "#72bf6a"}
                        strokeWidth={4}
                    />
                    <Marker coordinate={trip.locations[0]} title="Start" pinColor="green" />
                    <Marker
                        coordinate={trip.locations[trip.locations.length - 1]}
                        title="End"
                        pinColor="red"
                    />
                </MapView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { fontSize: 22, fontWeight: "bold", margin: 16 },
    infoCard: {
        backgroundColor: "#f9f9f9",
        marginHorizontal: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 16,
    },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    label: { fontWeight: "600", width: 100, color: "#555" },
    value: { fontWeight: "bold", fontSize: 16 },
    badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, justifyContent: "center", alignItems: "center" },
    badgeText: { color: "#fff", fontWeight: "bold" },
    mapContainer: {
        marginHorizontal: 16,
        borderRadius: 12,
        overflow: "hidden",
        height: 400,
        marginBottom: 32,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    map: { flex: 1 },
});
