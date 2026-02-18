import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { colors, spacing, borderRadius, typography, shadows } from "../../theme";

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  isOnline: boolean;
  isTyping: boolean;
  onBack: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMore?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ChatHeader: React.FC<ChatHeaderProps> = memo(({
  name,
  avatar,
  isOnline,
  isTyping,
  onBack,
  onCall,
  onVideoCall,
  onMore,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getStatusText = () => {
    if (isTyping) return "typing...";
    return isOnline ? "Online" : "Offline";
  };

  const getStatusColor = () => {
    if (isTyping) return colors.typing;
    return isOnline ? colors.online : colors.textTertiary;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      
      {/* Gradient overlay for depth */}
      <LinearGradient
        colors={["rgba(10,10,11,0.95)", "rgba(10,10,11,0.8)"]}
        style={styles.gradient}
      />

      {/* Back button */}
      <AnimatedPressable
        style={[styles.backButton, animatedStyle]}
        onPress={onBack}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Ionicons name="chevron-back" size={24} color={colors.primary} />
      </AnimatedPressable>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
          contentFit="cover"
          transition={200}
        />
        {isOnline && (
          <Animated.View 
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.onlineIndicator}
          />
        )}
      </View>

      {/* User info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Animated.Text 
          style={[styles.status, { color: getStatusColor() }]}
          entering={FadeIn.duration(150)}
          key={isTyping ? "typing" : "offline"}
        >
          {getStatusText()}
        </Animated.Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        {onCall && (
          <AnimatedPressable style={styles.actionButton} onPress={onCall}>
            <Ionicons name="call-outline" size={22} color={colors.textSecondary} />
          </AnimatedPressable>
        )}
        
        {onVideoCall && (
          <AnimatedPressable style={styles.actionButton} onPress={onVideoCall}>
            <Ionicons name="videocam-outline" size={22} color={colors.textSecondary} />
          </AnimatedPressable>
        )}

        {onMore && (
          <AnimatedPressable style={styles.actionButton} onPress={onMore}>
            <Ionicons name="ellipsis-vertical" size={22} color={colors.textSecondary} />
          </AnimatedPressable>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    ...shadows.small,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceElevated,
  },
  avatarContainer: {
    position: "relative",
    marginLeft: spacing.md,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceElevated,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: colors.online,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.background,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.lg,
    fontWeight: typography.semibold,
  },
  status: {
    fontSize: typography.sm,
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceElevated,
  },
});

export default ChatHeader;
