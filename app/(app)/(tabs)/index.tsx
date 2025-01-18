import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
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
  Dialog,
  HelperText,
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
import { useEffect, useState } from "react";
import { SIZES } from "@/constants/Sizes";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/ctx";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { set } from "date-fns";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const hisArr = [
  { name: "Home", address: "2972 Westheimer Rd." },
  { name: "Work", address: "2972 Westheimer Rd." },
  { name: "Sone", address: "2972 Westheimer Rd." },
  { name: "Shop", address: "2972 Westheimer Rd." },
  { name: "Palace", address: "2972 Westheimer Rd." },
];

interface Location {
  id: number;
  name: string;
  location: Record<string, any>;
}

export default function HomeScreen() {
  const { user, setupUser } = useAuth();

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
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [openAutocomplete, setOpenAutocomplete] = useState<string>("");
  const [from, setFrom] = useState<Record<string, any> | null>(null);
  const [to, setTo] = useState<Record<string, any> | null>(null);

  const [savedLocations, setSavedLocations] = useState<Location[]>([]);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [visbleAddLocation, setVisbleAddLocation] = useState<boolean>(false);
  const [locationName, setLocationName] = useState<string>("");

  const [location, setLocation] = useState<Record<string, any> | null>(null);

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);

  useEffect(() => {
    fetchLocations();
    checkProfileCompletion();
  }, []);

  const checkProfileCompletion = async () => {
    const hasCompletedProfile = await AsyncStorage.getItem(
      "hasCompletedProfile"
    );

    if (!hasCompletedProfile) {
      if (!user?.full_name || !user?.mobile || !user?.email) {
        setVisibleDialog(true);
      } else {
        await AsyncStorage.setItem("hasCompletedProfile", "true");
      }
    }
  };

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from("saveLocation")
      .select("*")
      .eq("userId", user?.id);
    if (error) {
      console.log(error);
      setSavedLocations([]);
    } else {
      setSavedLocations(data);
    }
  };

  const closeModel = async () => {
    await AsyncStorage.setItem("hasCompletedProfile", "true");
    setVisibleDialog(false);
  };

  const addLocation = async () => {
    if (!locationName) {
      return showSnack("Please enter a location name.");
    }

    if (!location) {
      return showSnack("Please select a location.");
    }
    setLocationLoading(true);

    const { error } = await supabase.from("saveLocation").insert({
      name: locationName,
      location: location,
      userId: user?.id,
    });

    if (error) {
      console.log(error);
      showSnack("Failed to add location.");
      setLocationLoading(false);
    } else {
      setVisbleAddLocation(false);
      setLocationName("");
      setLocation(null);
      fetchLocations();
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showLocationModal = () => setVisbleAddLocation(true);
  const hideLocationModal = () => setVisbleAddLocation(false);

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

    if (!from) {
      showSnack("Please select a from location.");
      return;
    }

    if (!to) {
      showSnack("Please select a to location.");
      return;
    }

    if (!user?.full_name || !user?.mobile || !user?.email) {
      showSnack("Please complete your profile.");

      setTimeout(() => {
        router.push("/(app)/(tabs)/account");
      }, 1000);
      return;
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
        from: from,
        to: to,
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
        setFrom(null);
        setTo(null);
        showModal();
      }
    } catch (error) {
      console.log(error);
      showSnack("Booking failed. Please try again later.");
      setBookingLoading(false);
    }
  };

  const showAutocompleteModal = (value: string) => {
    setOpenAutocomplete(value);
    setShowAutocomplete(true);
  };
  const closeAutocompleteModal = () => {
    setOpenAutocomplete("");
    setShowAutocomplete(false);
  };

  const validatePhoneNumber = (number: string) => {
    const canadianPhoneRegex = /^\+1\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    if (!canadianPhoneRegex.test(number)) {
      setError("Please enter a valid Canadian phone number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = async () => {
    if (validatePhoneNumber(phoneNumber)) {
      setPhoneLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .update({ mobile: phoneNumber })
        .eq("id", user?.id)
        .select();

      if (error) {
        console.log(error);
        showSnack("Some error occured");
        setPhoneLoading(false);
      } else {
        setupUser(data);
        setPhoneLoading(false);
      }
      closeModel();
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
        keyboardShouldPersistTaps="handled"
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
            <TouchableOpacity
              style={styles.textbox}
              onPress={() => showAutocompleteModal("from")}
            >
              <MaterialIcons
                name="my-location"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                {from ? ` ${from.name}` : "From"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textbox}
              onPress={() => showAutocompleteModal("to")}
            >
              <Ionicons
                name="location-outline"
                size={24}
                color={Colors["light"].textAcc1}
              />
              <Text
                variant="bodyLarge"
                style={{ color: Colors["light"].textAcc1 }}
              >
                {to ? ` ${to.name}` : "To"}
              </Text>
            </TouchableOpacity>

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
            disabled={date === "" || time === "" || !from || !to}
            onPress={book}
          >
            Book Now
          </Button>
        </View>

        <View style={styles.history}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Saved Locations
          </Text>
          <Pressable onPress={showLocationModal}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{
            marginTop: SIZES.width * 0.05,
            marginBottom: SIZES.width * 0.1,
          }}
        >
          {savedLocations.map((item, index) => (
            <View key={index} style={{ marginRight: 8 }}>
              <View style={styles.cardDefault}>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={34} color={"black"} />
                  <View>
                    <Text variant="titleSmall"> {item.name}</Text>
                    <Text variant="labelSmall"> {item.location.name}</Text>
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
        theme={{ colors: { onSurface: Colors.light.primary } }}
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

        <Modal
          visible={visbleAddLocation}
          onDismiss={hideLocationModal}
          contentContainerStyle={{
            backgroundColor: "white",
            margin: SIZES.width * 0.05,
            padding: SIZES.width * 0.05,
            borderRadius: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <IconButton icon="close" size={20} onPress={hideLocationModal} />
          </View>
          <View
            style={{
              margin: SIZES.width * 0.08,
              gap: 12,
            }}
          >
            <TextInput
              mode="flat"
              label="Location Name"
              value={locationName}
              onChangeText={(text) => setLocationName(text)}
              theme={{
                colors: { surfaceVariant: Colors["light"].secondary },
                roundness: 8,
              }}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              style={{
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
            <Pressable onPress={() => showAutocompleteModal("location")}>
              <TextInput
                mode="flat"
                label="Tap to select a location"
                // placeholder="Tap to select a location"
                value={location?.name || ""}
                editable={false}
                theme={{
                  colors: { surfaceVariant: Colors["light"].secondary },
                  roundness: 8,
                }}
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              />
            </Pressable>
          </View>
          <Button
            mode="contained"
            theme={{ roundness: 0 }}
            style={{ borderRadius: 8 }}
            dark
            textColor="white"
            labelStyle={{ fontSize: 15 }}
            contentStyle={{ height: 40 }}
            loading={locationLoading}
            onPress={addLocation}
          >
            Add
          </Button>
        </Modal>

        <Modal
          visible={showAutocomplete}
          onDismiss={() => closeAutocompleteModal()}
          contentContainerStyle={styles.modalContainer}
        >
          <IconButton
            icon="close"
            size={20}
            onPress={() => closeAutocompleteModal()}
            style={styles.closeButton}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.autocompleteContainer}
          >
            <GooglePlacesAutocomplete
              placeholder="Search for a location"
              fetchDetails={true}
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                if (openAutocomplete === "from") {
                  setFrom(details);
                } else if (openAutocomplete === "to") {
                  setTo(details);
                } else {
                  setLocation(details);
                }
                closeAutocompleteModal();
              }}
              onFail={(error) => {
                console.log(error);
              }}
              query={{
                key: "AIzaSyD-JggDDP0b4KRJSpCTeWRlou2OhzaBh94",
                language: "en",
                components: "country:ca",
              }}
              styles={{
                container: {
                  flex: 0,
                },
                textInput: styles.autocompleteInput,
                listView: styles.autocompleteListView,
              }}
            />

            {(openAutocomplete === "from" || openAutocomplete === "to") && (
              <FlashList
                data={savedLocations}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (openAutocomplete === "from") {
                          setFrom(item.location);
                        } else if (openAutocomplete === "to") {
                          setTo(item.location);
                        }
                        closeAutocompleteModal();
                      }}
                    >
                      <View key={item.id} style={{ marginRight: 8 }}>
                        <View style={styles.cardDefault1}>
                          <View style={styles.location}>
                            <Ionicons
                              name="location-outline"
                              size={34}
                              color={"black"}
                            />
                            <View>
                              <Text variant="titleSmall"> {item.name}</Text>
                              <Text variant="labelSmall">
                                {" "}
                                {item.location?.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                  );
                }}
                estimatedItemSize={300}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                contentContainerStyle={{
                  paddingHorizontal: SIZES.width * 0.05,
                  paddingTop: SIZES.height * 0.02,
                }}
                ListEmptyComponent={<Text>No saved locations</Text>}
              />
            )}
          </KeyboardAvoidingView>
        </Modal>

        <Dialog
          visible={visibleDialog}
          onDismiss={closeModel}
          theme={{ colors: { elevation: { level3: Colors.light.background } } }}
        >
          <Dialog.Title>Enter Your Phone Number</Dialog.Title>
          <Dialog.Content>
            <Text variant="labelLarge" style={{ marginBottom: 4 }}>
              Phone number
            </Text>
            <TextInput
              // label="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              keyboardType="phone-pad"
              placeholder="+1 xxx-xxx-xxxx"
              mode="outlined"
              autoComplete="tel"
              // onBlur={() => validatePhoneNumber(phoneNumber)}
            />
            <HelperText type="error" visible={!!error}>
              {error}
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeModel}>Skip</Button>
            <Button onPress={handleSave} loading={phoneLoading}>
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
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
    height: SIZES.width * 0.16,
  },
  cardDefault1: {
    backgroundColor: Colors["light"].background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderColor: Colors["light"].accent,
    borderWidth: 1,
    borderRadius: 8,
    // width: SIZES.width * 1,
    height: SIZES.width * 0.12,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    justifyContent: "flex-start",
    paddingTop: SIZES.height * 0.1, // Adjust modal offset
  },
  closeButton: {
    position: "absolute",
    top: SIZES.height * 0.02,
    right: SIZES.width * 0.04,
    zIndex: 10,
    // backgroundColor: "white",
    // borderRadius: 50,
    // padding: SIZES.width * 0.02,
    elevation: 5, // Shadow for Android
  },
  autocompleteContainer: {
    // paddingHorizontal: SIZES.width * 0.05,
    // paddingTop:SIZES.height * 0.02,
    flex: 1,
    // backgroundColor: "white",
    // borderRadius: 8,
    marginHorizontal: SIZES.width * 0.05,
    // elevation: 10,
    // maxHeight: SIZES.height * 0.5,
  },
  autocompleteInput: {
    height:
      Platform.OS === "android" ? SIZES.height * 0.05 : SIZES.height * 0.05,
    fontSize: SIZES.width * 0.03,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    // paddingHorizontal: SIZES.width * 0.03,
    borderWidth: 1,
    borderColor: "#ddd",
    // marginBottom: SIZES.height * 0.02,
  },
  autocompleteListView: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    marginTop: SIZES.height * 0.01,
    overflow: "hidden",
    maxHeight: SIZES.height * 0.4,
  },
  autocompleteRow: {
    paddingVertical: SIZES.height * 0.015,
    paddingHorizontal: SIZES.width * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    
  },
  autocompleteRowText: {
    fontSize: SIZES.width * 0.045,
    color: "#333",
  },
});
