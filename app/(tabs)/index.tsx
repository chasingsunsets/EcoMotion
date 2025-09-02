import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
      <View className="flex-1 justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
          {/*the text-primary is form extend in tailwind.config.js or u can just put text-blue-500*/}
        <Text className="text-5xl text-accent font-bold">Hello world! no hi</Text>
        <Link href="/rewards">Rewards</Link>
      </View>
  );
}
