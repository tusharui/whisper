import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { colors, spacing, borderRadius } from "../../theme";

interface TypingIndicatorProps {
  isVisible: boolean;
}

const Dot = ({ delay, opacity }: { delay: number; opacity: any }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: opacity.value }],
  }));

  React.useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withDelay(0, withDelay(0, opacity.value = 1)),
          withDelay(200, opacity.value = 0.4),
          withDelay(200, opacity.value = 1)
        ),
        -1,
        true
      )
    );
  }, [delay, opacity]);

  return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const TypingIndicator: React.FC<TypingIndicatorProps> = memo(({ isVisible }) => {
  const opacity1 = useSharedValue(0.4);
  const opacity2 = useSharedValue(0.4);
  const opacity3 = useSharedValue(0.4);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Dot delay={0} opacity={opacity1} />
      <Dot delay={150} opacity={opacity2} />
      <Dot delay={300} opacity={opacity3} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.typing,
  },
});

export default TypingIndicator;
