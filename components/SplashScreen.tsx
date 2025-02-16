import { Colors } from "@/constants/Colors";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Easing } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const AnimatedSplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(0)).current; // Circle scaling animation
  const textColor = useRef(new Animated.Value(0)).current; // Text color animation

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      // Step 1: Circle zooms out (text color changes)
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1.5, // Circle zooms out slightly
          duration: 500, // Slow zoom-out duration
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(textColor, {
          toValue: 1, // Text color transitions to white
          duration: 500, // Same duration as circle zoom-out
          useNativeDriver: false,
        }),
      ]),

      // Step 2: Circle zooms in to fixed size
      Animated.timing(scaleValue, {
        toValue: 1, // Circle fixed size
        duration: 250, // Smooth zoom-in
        easing: Easing.ease,
        useNativeDriver: true,
      }),

      // Step 3: Circle slightly zooms out and back in
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Slight zoom-out
          duration: 250, // Zoom-out duration
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Back to fixed size
          duration: 250, // Zoom-in duration
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),

      // Step 4: Circle zooms out to fill the screen
      Animated.timing(scaleValue, {
        toValue: 25, // Large scale to fill screen
        duration: 1000, // Slow zoom-out duration
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Interpolated text color (black to white)
  const interpolatedTextColor = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#000", "#FFF"], // Black to White
  });

  return (
    <View style={styles.container}>
      {/* Animated Circle */}
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleValue }], // Scale animation
          },
        ]}
      />

      {/* Animated Text */}
      <Animated.Text
        allowFontScaling={false}
        style={[
          styles.text,
          {
            color: interpolatedTextColor, // Text color transition
            zIndex: 1, // Keep text above circle
          },
        ]}
      >
        AB Cabs
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF", // Background color
    overflow: "hidden", // Prevent overflow
  },
  circle: {
    position: "absolute",
    width: width * 0.5, // Circle initial size
    height: width * 0.5,
    borderRadius: width / 2, // Perfect circle
    backgroundColor: Colors["light"].primary, // Blue circle color
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default AnimatedSplashScreen;
