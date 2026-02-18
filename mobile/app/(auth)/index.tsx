import { View, Text, Dimensions, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import useAuthSocial from "@/hooks/useSocialAuth";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();

  return (
    <View className="flex-1 bg-surface-dark">
      <SafeAreaView className="flex-1">
        
        {/* Logo Section */}
        <View className="items-center pt-10">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100, marginVertical: -20 }}
            contentFit="contain"
          />
          <Text className="text-4xl font-bold text-primary tracking-wider uppercase">
            Whisper
          </Text>
        </View>

        {/* Hero Section */}
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{
              width: width - 48,
              height: height * 0.3,
            }}
            contentFit="contain"
          />

          <View className="mt-6 items-center">
            <Text className="text-5xl font-bold text-foreground text-center">
              Connect & Chat
            </Text>
            <Text className="text-3xl font-bold text-primary">
              Seamlessly
            </Text>
          </View>

          {/* Auth Buttons */}
          <View className="flex-row gap-4 mt-10 w-full">
            
            {/* Google Button */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-white py-4 rounded-2xl active:scale-[0.97]"
              disabled={loadingStrategy === "oauth_google"}
              onPress={() => handleSocialAuth("oauth_google")}
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#1a1a1a" />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/google.png")}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                  />
                  <Text className="text-gray-900 font-semibold text-lg">
                    Google
                  </Text>
                </>
              )}
            </Pressable>

            {/* Apple Button */}
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-2 bg-black py-4 rounded-2xl active:scale-[0.97]"
              disabled={loadingStrategy === "oauth_apple"}
              onPress={() => handleSocialAuth("oauth_apple")}
            >
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons
                    name="logo-apple"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text className="text-white font-semibold text-lg">
                    Apple
                  </Text>
                </>
              )}
            </Pressable>

          </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
