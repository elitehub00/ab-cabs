import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import {
  Text,
  Card,
  Button,
  Snackbar,
  Modal,
  Portal,
  IconButton,
  TextInput,
} from "react-native-paper";
import { router, Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { useState } from "react";
import { SIZES } from "@/constants/Sizes";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/ctx";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const hisArr = [
  { name: "Home", address: "2972 Westheimer Rd." },
  { name: "Work", address: "2972 Westheimer Rd." },
  { name: "Sone", address: "2972 Westheimer Rd." },
  { name: "Shop", address: "2972 Westheimer Rd." },
  { name: "Palace", address: "2972 Westheimer Rd." },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [visibleSnack, setVisibleSnack] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showSnack = (message: string) => {
    setSnackMessage(message);
    setVisibleSnack(true);
  };

  const onDismissSnackBar = () => setVisibleSnack(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setDate(selectedDate.toLocaleDateString());
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    if (selectedTime) {
      setSelectedTime(selectedTime);
      setTime(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
    setShowTimePicker(false);
  };

  const book = async () => {
    if (!selectedDate || !selectedTime) {
      showSnack("Please select both date and time.");
      return;
    }

    if (!user?.full_name || !user?.mobile || !user?.email) {
      showSnack("Please complete your profile.");

      setTimeout(() => {
        router.push("/(app)/(tabs)/account");
      }, 1000);
    }

    setBookingLoading(true);
    try {
      // Combine the selected date and time
      const combinedDate = new Date(selectedDate);
      combinedDate.setHours(selectedTime.getHours());
      combinedDate.setMinutes(selectedTime.getMinutes());

      const { error } = await supabase.from("bookings").insert({
        date: combinedDate.toISOString(),
        time: selectedTime.toISOString(), // ISO format for consistency with time zones
        from: { name: "Home", address: "2972 Westheimer Rd." },
        to: { name: "Work", address: "2972 Westheimer Rd." },
        status: "upcoming",
        userId: user?.id,
      });

      if (error) {
        console.log(error);
        showSnack("Booking failed. Please try again later.");
        setBookingLoading(false);
      } else {
        setBookingLoading(false);
        setSelectedDate(undefined);
        setSelectedTime(undefined);
        setDate("");
        setTime("");
        showModal();
      }
    } catch (error) {
      console.log(error);
      showSnack("Booking failed. Please try again later.");
      setBookingLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors["light"].secondary }}>
      <Tabs.Screen
        options={{
          header: () => (
            <CustomHeader title="Welcome Back" isHome={true} isMenu={false} />
          ),
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container]}
      >
        <Card
          mode="contained"
          contentStyle={{ paddingVertical: 12, paddingHorizontal: 0 }}
          theme={{
            colors: { surfaceVariant: Colors["light"].background },
            roundness: 4,
          }}
        >
          <Card.Title
            title="Book A Ride Now"
            titleStyle={{ fontWeight: "bold" }}
            titleVariant="titleMedium"
          />
          <Card.Content style={{ gap: 20 }}>
            {/* From */}
            <View style={styles.textbox}>
              <MaterialIcons
                name="my-location"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                From
              </Text>
            </View>
            <View style={styles.textbox}>
              <Ionicons
                name="location-outline"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                To
              </Text>
            </View>

            {/* Pickup Date */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.textbox}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                Pickup Date: {date || "Select a date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                minimumDate={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Pickup Time */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.textbox}
            >
              <Feather
                name="clock"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                Pickup Time: {time || "Select a time"}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                minimumDate={new Date()}
                onChange={handleTimeChange}
              />
            )}
          </Card.Content>
        </Card>
        <View style={{ marginVertical: SIZES.width * 0.05 }}>
          <Button
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ borderRadius: 8 }}
            dark
            textColor="white"
            labelStyle={{ fontSize: 15 }}
            contentStyle={{ height: 50 }}
            loading={bookingLoading}
            disabled={date === "" || time === ""}
            onPress={book}
          >
            Book Now
          </Button>
        </View>

        <View style={styles.history}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Saved Locations
          </Text>
          <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: SIZES.width * 0.05,
            marginBottom: SIZES.width * 0.1,
          }}
        >
          {hisArr.map((item, index) => (
            <View key={index} style={{ marginRight: 8 }}>
              <View style={styles.cardDefault}>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={34} color={"black"} />
                  <View>
                    <Text variant="titleSmall"> {item.name}</Text>
                    <Text variant="labelSmall"> {item.address}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      <Snackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: "",
          icon: "close",
          onPress: () => {
            onDismissSnackBar();
          },
        }}
      >
        {snackMessage}
      </Snackbar>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "white",
            margin: SIZES.width * 0.05,
            padding: SIZES.width * 0.05,
            borderRadius: 8,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <IconButton
              icon="close"
              size={20}
              // color="black"
              onPress={hideModal}
            />
          </View>
          <View
            style={{
              margin: SIZES.width * 0.08,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("@/assets/images/booked.png")}
              style={{
                width: SIZES.width * 0.3,
                height: SIZES.width * 0.3,
                resizeMode: "contain",
              }}
            />
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", marginVertical: SIZES.width * 0.05 }}
            >
              Thank you
            </Text>
            <Text variant="bodyMedium">
              Your booking has been placed sent to AB Cabs. they Will contact
              you soon.
            </Text>
          </View>
          <Button
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ borderRadius: 8 }}
            dark
            textColor="white"
            labelStyle={{ fontSize: 15 }}
            contentStyle={{ height: 40 }}
            onPress={hideModal}
          >
            Done
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.width * 0.05,
    marginHorizontal: SIZES.width * 0.05,
  },
  textbox: {
    backgroundColor: Colors["light"].secondary,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  history: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDefault: {
    backgroundColor: Colors["light"].background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderColor: Colors["light"].accent,
    borderWidth: 1,
    borderRadius: 8,
    width: SIZES.width * 0.5,
    height: 80,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
});
