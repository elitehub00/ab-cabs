import { Colors } from "@/constants/Colors";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import Onboarding, { NextButtonProps } from "react-native-onboarding-swiper";
import { router } from "expo-router";
import { SIZES } from "@/constants/Sizes";

export default function OnBoarding() {
  const pages = [
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/on1.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: 50 }}>
          <Text variant="titleMedium" style={styles.subHead}>Welcome to Rideshare</Text>
          <Text variant="headlineLarge" style={styles.title}>Anywhere you are</Text>
        </View>
      ),
      subtitle: (
        <Text variant="bodyLarge" style={styles.subtitle}>
          Get picked up from wherever you are, at any time. With AB Cabs, your
          ride is just a tap away.
        </Text>
      ),
    },
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/on2.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: 50 }}>
          <Text variant="titleMedium" style={styles.subHead}>Choose Your Ride</Text>
          <Text variant="headlineLarge" style={styles.title}>At anytime</Text>
        </View>
      ),
      subtitle: (
        <Text variant="bodyLarge" style={styles.subtitle}>
          Schedule your rides or book on the go. AB Cabs ensures you're always
          on time, every time.
        </Text>
      ),
    },
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/on3.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: 50 }}>
          <Text variant="titleMedium" style={styles.subHead}>Fast and Secure Payments</Text>
          <Text variant="headlineLarge" style={styles.title}>Book your car</Text>
        </View>
      ),
      subtitle: (
        <Text variant="bodyLarge" style={styles.subtitle}>
          Find a cab instantly and pay effortlessly. Booking your next ride has
          never been easier with AB Cabs.
        </Text>
      ),
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
        <Text style={{ color: "#fff", fontWeight: "bold" ,fontSize:15}}>Next</Text>
      </TouchableOpacity>
    );
  };

  const SkipButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.skip} onPress={onPress}>
        <Text style={{ fontWeight: "bold",fontSize:15 }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const DoneButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.done} onPress={onPress}>
        <Text style={{ color: "#fff", fontWeight: "bold",fontSize:15}}>
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
      bottomBarColor={Colors["light"].secondary}
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
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    marginTop: SIZES.height * 0.2,
  },
  title: {
    color: "black",
    // fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
    marginVertical: 8,
  },
  subtitle: {
    // color: "#5D5D5D",
    // fontSize: 13,
    textAlign: "left",
    marginTop:12
    
  },
  subHead: {
    // color: "#5D5D5D",
    // fontSize: 15,
    textAlign: "left",
    marginBottom:8,
    // fontWeight: "bold",
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
  img: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
});
