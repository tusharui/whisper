import React, { useCallback, memo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { format } from "date-fns";
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, typography } from "../../theme";
import { Message, MessageStatus, MessageReaction } from "../../../types/index";

interface MessageBubbleProps {
  message: Message;
  isFromMe: boolean;
  showAvatar?: boolean;
  isGrouped?: boolean;
  isLastInGroup?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const MessageBubble: React.FC<MessageBubbleProps> = memo(({
  message,
  isFromMe,
  showAvatar = !isFromMe,
  isGrouped = false,
  isLastInGroup = false,
}) => {
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const formatTime = useCallback((dateString: string) => {
    try {
      return format(new Date(dateString), "HH:mm");
    } catch {
      return "";
    }
  }, []);

  const renderStatus = useCallback(() => {
    if (!isFromMe) return null;

    const statusConfig: Record<string, { icon: string; color: string }> = {
      sending: { icon: "time-outline", color: colors.textTertiary },
      sent: { icon: "checkmark", color: colors.textTertiary },
      delivered: { icon: "checkmark-done-outline", color: colors.textTertiary },
      read: { icon: "checkmark-done", color: colors.success },
      failed: { icon: "alert-circle", color: colors.error },
    };

    const status = message.status || "sent";
    const config = statusConfig[status] || statusConfig.sent;

    return (
      <Animated.View style={statusAnimatedStyle}>
        <Ionicons name={config.icon as any} size={12} color={config.color} />
      </Animated.View>
    );
  }, [isFromMe, message.status]);

  const statusAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sender = typeof message.sender === 'string' 
    ? { _id: message.sender, name: "", email: "", avatar: "" }
    : message.sender;

  return (
    <AnimatedPressable
      style={[
        styles.container,
        isFromMe ? styles.containerRight : styles.containerLeft,
        animatedStyle,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {/* Avatar - only for received messages */}
      <View style={styles.avatarWrapper}>
        {showAvatar && !isFromMe && !isGrouped ? (
          <Image
            source={{ uri: sender.avatar }}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
      </View>

      {/* Message bubble */}
      <View style={styles.bubbleWrapper}>
        {/* Sender name for group chats */}
        {!isFromMe && !isGrouped && (
          <Text style={styles.senderName}>{sender.name}</Text>
        )}

        <Animated.View
          style={[
            styles.bubble,
            isFromMe ? styles.bubbleSent : styles.bubbleReceived,
            isGrouped && (isFromMe ? styles.bubbleSentGrouped : styles.bubbleReceivedGrouped),
            isLastInGroup && (isFromMe ? styles.bubbleSentLast : styles.bubbleReceivedLast),
          ]}
        >
          {/* Reactions preview */}
          {message.reactions && message.reactions.length > 0 && (
            <View style={styles.reactionsRow}>
              {message.reactions.slice(0, 3).map((reaction: MessageReaction, index: number) => (
                <Text key={index} style={styles.reaction}>
                  {reaction.emoji}
                </Text>
              ))}
              {message.reactions.length > 3 && (
                <Text style={styles.reactionsCount}>+{message.reactions.length - 3}</Text>
              )}
            </View>
          )}

          {/* Message text */}
          <Text style={[styles.text, isFromMe ? styles.textSent : styles.textReceived]}>
            {message.text}
          </Text>

          {/* Footer with time and status */}
          <View style={[styles.footer, isFromMe ? styles.footerRight : styles.footerLeft]}>
            <Text style={[styles.time, isFromMe ? styles.timeSent : styles.timeReceived]}>
              {formatTime(message.createdAt)}
            </Text>
            {renderStatus()}
          </View>
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing.md,
    paddingVertical: 1,
    alignItems: "flex-end",
  },
  containerRight: {
    justifyContent: "flex-end",
  },
  containerLeft: {
    justifyContent: "flex-start",
  },
  avatarWrapper: {
    width: 32,
    marginRight: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: 32,
  },
  bubbleWrapper: {
    maxWidth: "75%",
    flexDirection: "column",
  },
  senderName: {
    color: colors.primary,
    fontSize: typography.sm,
    fontWeight: typography.medium,
    marginBottom: 2,
    marginLeft: spacing.sm,
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    maxWidth: "100%",
  },
  bubbleSent: {
    backgroundColor: colors.bubbleSent,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.sm,
    borderBottomLeftRadius: borderRadius.xl,
  },
  bubbleReceived: {
    backgroundColor: colors.bubbleReceived,
    borderTopLeftRadius: borderRadius.sm,
    borderTopRightRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
  },
  bubbleSentGrouped: {
    borderTopLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.sm,
  },
  bubbleReceivedGrouped: {
    borderTopLeftRadius: borderRadius.sm,
    borderBottomLeftRadius: borderRadius.xl,
  },
  bubbleSentLast: {
    borderBottomRightRadius: borderRadius.xl,
  },
  bubbleReceivedLast: {
    borderBottomLeftRadius: borderRadius.xl,
  },
  reactionsRow: {
    flexDirection: "row",
    marginBottom: spacing.xs,
    gap: 2,
  },
  reaction: {
    fontSize: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  reactionsCount: {
    fontSize: 10,
    color: colors.textTertiary,
    marginLeft: 2,
  },
  text: {
    fontSize: typography.md,
    lineHeight: 20,
  },
  textSent: {
    color: colors.bubbleTextSent,
  },
  textReceived: {
    color: colors.bubbleTextReceived,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: spacing.xs,
    gap: 4,
  },
  footerRight: {
    justifyContent: "flex-end",
  },
  footerLeft: {
    justifyContent: "flex-start",
  },
  time: {
    fontSize: typography.xs,
  },
  timeSent: {
    color: "rgba(10, 10, 11, 0.5)",
  },
  timeReceived: {
    color: "rgba(255, 255, 255, 0.45)",
  },
});

export default memo(MessageBubble);
