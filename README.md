# Welcome to EcoMotion!! 👋

EcoMotion is a mobile application designed to address the problem of user motivation in environmental action by transforming sustainability actions into a gamified and rewarding experience. The core features are built around tracking sustainable transportation and rewarding users for their eco-friendly behaviors, building habits for users to make sustainable choices effortlessly.

Unlike traditional sustainability apps, EcoMotion promotes sustainable behaviour to the users while providing minimal disturbance to the user's current lifestyle.

## Proposed solution and features
Our application features:
1. Transportation tracking system:  Using a combination of GPS data, accelerometer and gyroscope sensor, the app will be able to automatically track eco-friendly transport modes such as walking, cycling, taking the bus, or riding the MRT.
2. Rewards system: Used to incentivize continued engagement and environmental actions. The user will earn points depending on the distance travelled by the user through eco-friendly transportation. However, a minimum distance, configurable based on transportation mode, will be required to prevent the exploitation of the system for short, non-impactful trips.  Using these points, the user will be able to redeem practical rewards which may include NTUC vouchers or public transportation card top-up, expenses that the general public face. This makes the rewards more desirable and provides a direct, tangible incentive for eco-friendly behaviour.
3. Community sharing function: The user is able to take and upload pictures into the community forum to share their eco-friendly journey. As the user uploads, the system will need to ensure that it corresponds with a confirmed eco-friendly activity such as riding a bicycle before rewarding a small amount of points to motivate the user to continue.

## Running our app
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). It uses react native and TypeScript.

Before starting, ensure that you have the following installed:
- Node.js

## Get started

1. On mobile, install the Expo Go application.
2. Ensure that you have the following installed:
    - Node.js


3. Install dependencies

   ```bash
   npm install
   npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
   ```

5. Start the app

   ```bash
   npx expo start
   ```

6. Scan the code shown in the bash with the Expo Go application to view in mobile.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
