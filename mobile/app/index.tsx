import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D0D0F" }}>
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }

  if (isSignedIn) return <Redirect href="/(tabs)/home" />;

  return <Redirect href="/(auth)" />;
}
