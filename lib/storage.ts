import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Trip {
    id: string;
    startedAt: string;
    endedAt: string;
    locations: { latitude: number; longitude: number }[];
    transportType?: string;
    points?: number;
    hasSpeedViolations?: boolean;
}

const TRIPS_KEY = "TRIPS";

// Save a trip
export const saveTrip = async (trip: Trip) => {
    const trips = await getTrips();
    trips.push(trip);
    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

// Get all trips
export const getTrips = async (): Promise<Trip[]> => {
    const json = await AsyncStorage.getItem(TRIPS_KEY);
    return json ? JSON.parse(json) : [];
};

// Get a trip by ID
export const getTripById = async (id: string): Promise<Trip | null> => {
    const trips = await getTrips();
    return trips.find((t) => t.id === id) || null;
};

// Clear all trips
export const clearTrips = async () => {
    await AsyncStorage.removeItem("TRIPS");
};

// Seed fake trips
export const seedTrips = async () => {
    const fakeTrips: Trip[] = [
        {
            id: "1",
            startedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            endedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
            locations: [
                { latitude: 1.3521, longitude: 103.8198 },
                { latitude: 1.3530, longitude: 103.8200 },
            ],
            transportType: "Walking",
            points: 12,
            hasSpeedViolations: false,
        },
        {
            id: "2",
            startedAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
            endedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            locations: [
                { latitude: 1.3525, longitude: 103.8190 },
                { latitude: 1.3535, longitude: 103.8210 },
            ],
            transportType: "Biking",
            points: 20,
            hasSpeedViolations: false,
        },
        {
            id: "3",
            startedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
            endedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
            locations: [
                { latitude: 1.3540, longitude: 103.8180 },
                { latitude: 1.3550, longitude: 103.8200 },
            ],
            transportType: "Driving",
            points: 5,
            hasSpeedViolations: false,
        },
    ];

    await AsyncStorage.setItem(TRIPS_KEY, JSON.stringify(fakeTrips));
};
