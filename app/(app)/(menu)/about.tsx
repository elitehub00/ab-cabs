import { View, StyleSheet, Image, ScrollView } from "react-native";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import NoScaleText from "@/components/ui/CustomText";
export default function About() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <CustomHeader title="About" isHome={false} isMenu={true} />
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/icon.png")}
          />
        </View>
        <View style={styles.section}>
          <NoScaleText style={styles.title}>Welcome to AB Cabs</NoScaleText>
          <NoScaleText style={styles.description}>
            Your Reliable Ride, Anytime, Anywhere! At AB Cabs, we are passionate
            about transforming the way people travel. Whether it’s a quick trip
            across town, a daily commute, or a special occasion, our service
            ensures that every ride is seamless, comfortable, and dependable.
          </NoScaleText>
        </View>
        <View style={styles.section}>
          <NoScaleText style={styles.subtitle}>Our Vision</NoScaleText>
          <NoScaleText style={styles.description}>
            To bridge the gap between people and places with transportation
            solutions that are efficient, accessible, and trustworthy.
          </NoScaleText>
          <NoScaleText style={styles.listTitle}>Our Values:</NoScaleText>
          <NoScaleText style={styles.listItem}>• Customer Commitment: Your needs are our priority.</NoScaleText>
          <NoScaleText style={styles.listItem}>• Punctuality: We value your time and ensure prompt service.</NoScaleText>
          <NoScaleText style={styles.listItem}>• Innovation: Leveraging technology for an enhanced experience.</NoScaleText>
          <NoScaleText style={styles.listItem}>• Safety and Trust: Secure rides with the highest standards of care.</NoScaleText>
        </View>
        <View style={styles.section}>
          <NoScaleText style={styles.subtitle}>Why Choose AB Cabs?</NoScaleText>
          <NoScaleText style={styles.listItem}>✅ Real-Time Tracking: Monitor your ride in real-time.</NoScaleText>
          <NoScaleText style={styles.listItem}>✅ Flexible Options: Choose the ride type that fits your journey.</NoScaleText>
          <NoScaleText style={styles.listItem}>✅ 24/7 Service: Wherever and whenever you need us.</NoScaleText>
        </View>
        <View style={styles.footer}>
          <NoScaleText style={styles.subtitle}>Your Ride, Our Responsibility</NoScaleText>
          <NoScaleText style={styles.description}>
            With AB Cabs, your journey is our priority. We’re committed to
            providing reliable and safe rides, ensuring peace of mind at every step.
          </NoScaleText>
          <NoScaleText style={styles.listTitle}>Get in Touch:</NoScaleText>
          <NoScaleText style={styles.description}>
            Have questions or need assistance? Contact our support team via the app
            or our helpline. Let AB Cabs make your next ride a better experience!
          </NoScaleText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  contentContainer: {
    padding: SIZES.width * 0.05,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: SIZES.width * 0.35,
    height: SIZES.width * 0.35,
    resizeMode: "contain",
  },
  section: {
    backgroundColor: "#E3F2FD",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 24,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
  },
  footer: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
});
