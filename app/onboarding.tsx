import { Colors } from "@/constants/Colors";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import Onboarding, { NextButtonProps } from "react-native-onboarding-swiper";
import { router } from "expo-router";
import { SIZES } from "@/constants/Sizes";
import NoScaleText from "@/components/ui/CustomText";

const scaleSize = (size: any) => (SIZES.width / 375) * size;
export default function OnBoarding() {
  const pages = [
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/11.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: SIZES.height * 0.01 }}>
          <NoScaleText variant="titleMedium" style={styles.subHead}>
            Welcome to AB Cabs
          </NoScaleText>
          <NoScaleText variant="headlineLarge" style={styles.title}>
            Anywhere you are
          </NoScaleText>
        </View>
      ),
      subtitle: (
        <NoScaleText variant="bodyLarge" style={styles.subtitle}>
          Get picked up from wherever you are, at any time. With AB Cabs, your
          ride is just a tap away.
        </NoScaleText>
      ),
    },
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/22.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: SIZES.height * 0.01 }}>
          <NoScaleText variant="titleMedium" style={styles.subHead}>
            Choose Your Ride
          </NoScaleText>
          <NoScaleText variant="headlineLarge" style={styles.title}>
            At anytime
          </NoScaleText>
        </View>
      ),
      subtitle: (
        <NoScaleText variant="bodyLarge" style={styles.subtitle}>
          Schedule your rides or book on the go. AB Cabs ensures you're always
          on time, every time.
        </NoScaleText>
      ),
    },
    {
      backgroundColor: Colors["light"].secondary,
      image: (
        <Image
          source={require("../assets/images/33.png")}
          style={styles.img}
        />
      ),
      title: (
        <View style={{ marginTop: SIZES.height * 0.01 }}>
          <NoScaleText variant="titleMedium" style={styles.subHead}>
            Fast and Secure Payments
          </NoScaleText>
          <NoScaleText variant="headlineLarge" style={styles.title}>
            Book your car
          </NoScaleText>
        </View>
      ),
      subtitle: (
        <NoScaleText variant="bodyLarge" style={styles.subtitle}>
          Find a cab instantly and pay effortlessly. Booking your next ride has
          never been easier with AB Cabs.
        </NoScaleText>
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
        <NoScaleText
          style={{ color: "#fff", fontWeight: "bold", fontSize: scaleSize(15) }}
        >
          Next
        </NoScaleText>
      </TouchableOpacity>
    );
  };

  const SkipButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.skip} onPress={onPress}>
        <NoScaleText style={{ fontWeight: "bold", fontSize: scaleSize(15) }}>
          Skip
        </NoScaleText>
      </TouchableOpacity>
    );
  };

  const DoneButton = ({ onPress }: any) => {
    return (
      <TouchableOpacity style={styles.done} onPress={onPress}>
        <NoScaleText
          style={{ color: "#fff", fontWeight: "bold", fontSize: scaleSize(15) }}
        >
          Continue to App
        </NoScaleText>
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
    paddingHorizontal: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.1,
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
    marginTop: 12,
  },
  subHead: {
    // color: "#5D5D5D",
    // fontSize: 15,
    textAlign: "left",
    marginBottom: 8,
    // fontWeight: "bold",
  },
 
  dot: {
    marginHorizontal: SIZES.width * 0.01,
  },
  activeDot: {
    width: SIZES.width * 0.04,
    height: SIZES.height * 0.008,
    borderRadius: SIZES.width * 0.02,
    backgroundColor: Colors["light"].primary,
  },
  inactiveDot: {
    width: SIZES.width * 0.02,
    height: SIZES.height * 0.008,
    borderRadius: SIZES.width * 0.01,
    backgroundColor: "#A0D9F1",
  },
  next: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.height * 0.01,
    backgroundColor: Colors["light"].primary,
    borderRadius: SIZES.width * 0.02,
    margin: SIZES.width * 0.03,
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.3,
  },
  skip: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.height * 0.01,
    backgroundColor: Colors["light"].accent,
    borderRadius: SIZES.width * 0.02,
    margin: SIZES.width * 0.03,
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.3,
  },
  done: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.height * 0.01,
    backgroundColor: Colors["light"].primary,
    borderRadius: SIZES.width * 0.02,
    margin: SIZES.width * 0.03,
    height: SIZES.height * 0.05,
    width: SIZES.width * 0.4,
  },
  img: {
    width: "100%",
    height: SIZES.width * 0.8,
    resizeMode: "contain",
  },
});
