import React, { useState, useEffect } from "react";
import {
    View,
    Button,
    Alert,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";
import { saveTrip, Trip } from "../../lib/storage";
import { useRouter } from "expo-router";
import * as Crypto from "expo-crypto";

const TRANSPORT_TYPES = ["Walking", "Biking", "Public Transport", "Driving"];
const MAX_SPEEDS: Record<string, number> = {
    Walking: 12,
    Biking: 30,
    "Public Transport": 80,
    Driving: 120,
};
const TRANSPORT_MULTIPLIER: Record<string, number> = {
    Walking: 1.5,
    Biking: 1.2,
    "Public Transport": 1.0,
    Driving: 0.5,
};
const TRANSPORT_COLORS: Record<string, string> = {
    Walking: "#4CAF50",
    Biking: "#4CAF50",
    "Public Transport": "#FFC107",
    Driving: "#9E9E9E",
};

export default function NewTrip() {
    const [recording, setRecording] = useState(false);
    const [locations, setLocations] = useState<{ latitude: number; longitude: number }[]>([]);
    const [subscription, setSubscription] = useState<any>(null);
    const [startedAt, setStartedAt] = useState<string | null>(null);
    const [transportType, setTransportType] = useState<string | null>(null);
    const [hasSpeedViolation, setHasSpeedViolation] = useState(false);
    const [points, setPoints] = useState<number>(0);
    const router = useRouter();

    useEffect(() => () => subscription?.remove(), [subscription]);

    const toRad = (x: number) => (x * Math.PI) / 180;
    const haversineDistance = (
        c1: { latitude: number; longitude: number },
        c2: { latitude: number; longitude: number }
    ) => {
        const R = 6371;
        const dLat = toRad(c2.latitude - c1.latitude);
        const dLon = toRad(c2.longitude - c1.longitude);
        const lat1 = toRad(c1.latitude);
        const lat2 = toRad(c2.latitude);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const calculateTotalDistance = (locs: { latitude: number; longitude: number }[]) => {
        let total = 0;
        for (let i = 1; i < locs.length; i++) total += haversineDistance(locs[i - 1], locs[i]);
        return total;
    };

    const calculatePoints = (
        locs: { latitude: number; longitude: number }[],
        type: string,
        startedAt: string,
        endedAt: string
    ) => {
        const distance = calculateTotalDistance(locs);
        const durationMinutes = (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 60000;
        const multiplier = TRANSPORT_MULTIPLIER[type] || 1;
        return Math.round(distance * durationMinutes * multiplier);
    };

    const startTrip = async () => {
        if (!transportType) { Alert.alert("Select Transport", "Please choose a transport type."); return; }

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") { Alert.alert("Permission denied", "Location access required."); return; }

        setRecording(true);
        setStartedAt(new Date().toISOString());
        setHasSpeedViolation(false);
        setLocations([]);
        setPoints(0);

        const sub = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
            (location) => {
                setLocations((prev) => {
                    if (prev.length === 0) return [location.coords];

                    const last = prev[prev.length - 1];
                    const distance = haversineDistance(last, location.coords);
                    const speed = distance / (5 / 3600); // km/h
                    if (speed > MAX_SPEEDS[transportType!]) setHasSpeedViolation(true);

                    const updated = [...prev, location.coords];
                    const pts = calculatePoints(updated, transportType!, startedAt!, new Date().toISOString());
                    setPoints(pts);
                    return updated;
                });
            }
        );

        setSubscription(sub);
    };

    const stopTrip = async () => {
        subscription?.remove();
        setSubscription(null);
        setRecording(false);
        if (!startedAt || locations.length === 0) return;

        const endedAt = new Date().toISOString();
        const durationSeconds = (new Date(endedAt).getTime() - new Date(startedAt).getTime()) / 1000;

        if (durationSeconds < 5) { // min duration for testing
            Alert.alert("Trip Too Short", "Trips shorter than 5 seconds are not recorded.");
            setLocations([]);
            setPoints(0);
            setHasSpeedViolation(false);
            return;
        }

        const pts = calculatePoints(locations, transportType!, startedAt, endedAt);

        const trip: Trip = {
            id: Crypto.randomUUID(),
            startedAt,
            endedAt,
            locations,
            transportType,
            points: pts,
            hasSpeedViolations: hasSpeedViolation,
        };

        await saveTrip(trip);
        router.push("/tracking");
    };

    const initialRegion = locations[0] || { latitude: 1.3521, longitude: 103.8198, latitudeDelta: 0.1, longitudeDelta: 0.1 };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                {/* Transport Type Selection */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Select Transport Type:</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                        {TRANSPORT_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.transportButton,
                                    transportType === type && styles.transportButtonSelected,
                                ]}
                                onPress={() => setTransportType(type)}
                            >
                                <Text
                                    style={[
                                        styles.transportButtonText,
                                        transportType === type && styles.transportButtonTextSelected,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {!recording ? (
                        <Button title="Start Trip" onPress={startTrip} color="#4CAF50" />
                    ) : (
                        <Button title="Stop Trip" onPress={stopTrip} color="#E53935" />
                    )}

                    {recording && (
                        <Text style={{
                            marginTop: 8,
                            fontWeight: "bold",
                            fontSize: 16,
                            color: TRANSPORT_COLORS[transportType!] || "#72bf6a"
                        }}>
                            Points so far: {points}
                        </Text>
                    )}
                </View>

                {/* Map */}
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={initialRegion}>
                        {locations.length > 0 && (
                            <>
                                <Polyline
                                    coordinates={locations}
                                    strokeColor={hasSpeedViolation ? "red" : "#4CAF50"}
                                    strokeWidth={4}
                                />
                                <Marker coordinate={locations[0]} title="Start" pinColor="green" />
                                <Marker coordinate={locations[locations.length - 1]} title="End" pinColor="red" />
                            </>
                        )}
                    </MapView>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    transportButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    transportButtonSelected: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
    transportButtonText: { color: "#000" },
    transportButtonTextSelected: { color: "#fff", fontWeight: "bold" },
    mapContainer: {
        borderRadius: 16,
        overflow: "hidden",
        height: 400,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    map: { flex: 1 },
});
