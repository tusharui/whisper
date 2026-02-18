// Professional Design System - 2026 Standards

export const colors = {
  // Primary brand
  primary: "#F4A261",
  primaryLight: "#F7B88A",
  primaryDark: "#D4894A",
  
  // Backgrounds
  background: "#0A0A0B",
  surface: "#141416",
  surfaceElevated: "#1C1C1F",
  surfaceHighlight: "#252528",
  
  // Message bubbles
  bubbleSent: "#F4A261",
  bubbleReceived: "#1C1C1F",
  bubbleTextSent: "#0A0A0B",
  bubbleTextReceived: "#FFFFFF",
  
  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  textTertiary: "#71717A",
  textMuted: "#52525B",
  
  // Accents
  success: "#22C55E",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
  
  // Online status
  online: "#22C55E",
  offline: "#71717A",
  typing: "#F4A261",
  
  // Borders
  border: "#27272A",
  borderLight: "#3F3F46",
  
  // Shadows
  shadow: "#000000",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const typography = {
  // Font sizes following iOS HIG
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 22,
  xxxl: 28,
  
  // Font weights
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
};

// Animation configs
export const animations = {
  fast: 150,
  normal: 250,
  slow: 400,
  spring: {
    damping: 15,
    stiffness: 150,
  },
};

export default {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
  animations,
};
