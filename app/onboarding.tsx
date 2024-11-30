import { Colors } from "@/constants/Colors";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import Onboarding, { NextButtonProps } from "react-native-onboarding-swiper";
import { router } from "expo-router";

export default function OnBoarding() {
  const pages = [
    {
      backgroundColor: "#fff",
      image: <Image source={require("../assets/images/on1.png")} />,
      title: "Anywhere you are",
      subtitle:
        "Get picked up from wherever you are, at any time. With AB Cabs, your ride is just a tap away.",
    },
    {
      backgroundColor: "#fff",
      image: <Image source={require("../assets/images/on2.png")} />,
      title: "At anytime",
      subtitle:
        "Schedule your rides or book on the go. AB Cabs ensures you're always on time, every time.",
    },
    {
      backgroundColor: "#fff",
      image: <Image source={require("../assets/images/on3.png")} />,
      title: "Book your car",
      subtitle:
        "Find a cab instantly and pay effortlessly. Booking your next ride has never been easier with AB Cabs.",
    },
  ];

  interface DotProps {
    selected: boolean;
  }

  const CustomDot: React.FC<DotProps> = ({ selected }) => {
    return (
      <View
        style={[styles.dot, selected ? styles.activeDot : styles.inactiveDot]}
      />
    );
  };

  const NextButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.next} onPress={onPress}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
    );
  };

  const SkipButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.skip} onPress={onPress}>
        <Text style={{ fontWeight: "bold" }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const DoneButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.done} onPress={onPress}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Continue to App
        </Text>
      </TouchableOpacity>
    );
  };

  const handleDone = async () => {
    await AsyncStorage.setItem("onboarded", "true");

    router.replace("/login");
  };

  return (
    <Onboarding
      pages={pages}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      bottomBarColor="#fff"
      bottomBarHeight={120}
      DotComponent={CustomDot}
      NextButtonComponent={NextButton}
      SkipButtonComponent={SkipButton}
      DoneButtonComponent={DoneButton}
      containerStyles={styles.pageContainer}
      onSkip={handleDone}
      onDone={handleDone}
    />
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "flex-start", // Align all content in the container to the left
    paddingHorizontal: 24,
  },
  title: {
    color: Colors["light"].text,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
  },
  subtitle: {
    color: "#5D5D5D",
    fontSize: 13,
    textAlign: "left",
  },
  dot: {
    marginHorizontal: 3,
  },
  activeDot: {
    width: 16, // Rectangular width
    height: 8, // Rectangular height
    borderRadius: 4, // Rounded corners
    backgroundColor: Colors["light"].primary,
  },
  inactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4, // Circular
    backgroundColor: "#A0D9F1",
  },
  next: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors["light"].primary,
    borderRadius: 8,
    margin: 12,
    height: 42,
    width: 150,
  },
  skip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors["light"].accent,
    borderRadius: 8,
    margin: 12,
    height: 42,
    width: 150,
  },
  done: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors["light"].primary,
    borderRadius: 8,
    margin: 12,
    height: 42,
    width: 150,
  },
});
