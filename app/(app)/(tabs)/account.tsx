import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { SIZES } from "@/constants/Sizes";
import { decode } from "base64-arraybuffer";
import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, TextInput, Text, Button, Snackbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { CustomHeader } from "@/components/ui/CustomHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/context/ctx";
import { supabase } from "@/lib/supabase";

export default function Account() {
  const { user, setupUser } = useAuth();
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  interface User {
    full_name: string;
    mobile: string;
    email: string;
    avatar_url?: string; // Optional property
  }

  const showSnack = (message: string) => {
    setSnackMessage(message);
    setVisibleSnack(true);
  };
  const onDismissSnackBar = () => setVisibleSnack(false);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(
        /^\+?1?\s?\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        "Enter a valid Canadian phone number"
      )
      .required("Phone number is required"),

    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const getBase64ImageUri = (avatarUrl: any) => {
    if (avatarUrl.startsWith("data:image")) {
      // If the base64 string already includes the data URI prefix, return it directly
      return avatarUrl;
    }

    // Dynamically determine if the image is PNG or JPEG
    const isPng = avatarUrl.charAt(0) === "i"; // PNG starts with 'iVBORw0KG...'
    const isJpeg = avatarUrl.charAt(0) === "/"; // JPEG starts with '/9j/'

    // Set the correct prefix based on the image type
    if (isPng) {
      return `data:image/png;base64,${avatarUrl}`;
    } else if (isJpeg) {
      return `data:image/jpeg;base64,${avatarUrl}`;
    } else {
      // Default to JPEG if the type can't be determined
      return `data:image/jpeg;base64,${avatarUrl}`;
    }
  };

  // Image picker handler
  const pickImage = async (setFieldValue: any) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setFieldValue("avatar_url", result.assets[0].base64); // Save the selected image URI
      setFieldValue(
        "avatar_preview",
        getBase64ImageUri(result.assets[0].base64)
      ); // Save the selected image preview URI
    }
  };

  const generateUniquePath = (prefix: string) => {
    const uniqueIdentifier = new Date().getTime(); // You can use a different method to generate a unique identifier
    return `${prefix}/${uniqueIdentifier}`;
  };

  const uploadImage = async (folder: string, name: string, image: any) => {
    const uniquePath = generateUniquePath(name);

    const result = await supabase.storage
      .from(folder)
      .upload(uniquePath, decode(image), {
        // cacheControl: '1',
        //   upsert: false,
        contentType: "image/png",
      });
    if (result.error) {
      console.log("network issue", result.error);
      showSnack("Some Error occurred. Please try again later.");
      setIsLoading(false);
      return null;
    }
    return result;
  };

  const handleSave = async (values: any) => {
    setIsLoading(true);
    const { name, phone, email, avatar_url } = values;

    const updatedUser: User = {
      full_name: name,
      mobile: phone,
      email: email,
    };

    if (avatar_url) {
      const postImg = await uploadImage("avatars", `user`, avatar_url);
      if (postImg) {
        const url = postImg.data.path;
        const postImgUrl = await supabase.storage
          .from("avatars")
          .getPublicUrl(url);

        if (postImgUrl.data?.publicUrl) {
          updatedUser.avatar_url = postImgUrl.data.publicUrl;
        }
      }
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedUser)
      .eq("id", user?.id)
      .select();

    if (error) {
      console.log(error);
      setIsLoading(false);

      showSnack(
        "Error occurred while updating profile. Please try again later."
      );
    } else {
      showSnack("Profile updated successfully!");
      setupUser(data);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Tabs.Screen
          options={{
            header: () => (
              <CustomHeader
                title="Your Account"
                isHome={false}
                isMenu={false}
              />
            ),
          }}
        />
        <Image
          source={require("@/assets/images/banner.png")}
          style={{
            width: "100%",
            height: SIZES.height * 0.18,
            resizeMode: "cover",
          }}
        />
        <View style={styles.contentContainer}>
          <Formik
            initialValues={{
              name: user?.full_name || "",
              phone: user?.mobile || "",
              email: user?.email || "",
              avatar_url: null,
              avatar_preview: user?.avatar_url || null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // console.log("Form Values:", values);
              handleSave(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View>
                {/* Avatar Picker */}
                <View style={styles.avtar}>
                  <TouchableOpacity onPress={() => pickImage(setFieldValue)}>
                    {values.avatar_preview && values.avatar_preview !== "" ? (
                      <Avatar.Image
                        size={SIZES.width * 0.3}
                        source={{ uri: values.avatar_preview }}
                      />
                    ) : (
                      <Avatar.Icon
                        size={SIZES.width * 0.3}
                        icon="account"
                        color={Colors["light"].primary}
                      />
                    )}
                    <View style={styles.icon}>
                      <MaterialCommunityIcons
                        name="camera-outline"
                        size={16}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Name Field */}
                <View>
                  <Text variant="labelLarge" style={{ marginBottom: 4 }}>
                    Name
                  </Text>
                  <TextInput
                    mode="flat"
                    label=""
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    theme={{
                      colors: { surfaceVariant: Colors["light"].background },
                      roundness: 8,
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                    error={touched.name && !!errors.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                {/* Phone Number Field */}
                <View>
                  <Text variant="labelLarge" style={{ marginBottom: 4 }}>
                    Phone number
                  </Text>
                  <TextInput
                    mode="flat"
                    label=""
                    placeholder="+1 (XXX) XXX-XXXX"
                    placeholderTextColor={Colors["light"].textAcc1}
                    inputMode="tel"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    theme={{
                      colors: { surfaceVariant: Colors["light"].background },
                      roundness: 8,
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                    error={touched.phone && !!errors.phone}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>

                {/* Email Field */}
                <View>
                  <Text variant="labelLarge" style={{ marginBottom: 4 }}>
                    Email
                  </Text>
                  <TextInput
                    mode="flat"
                    label=""
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    theme={{
                      colors: { surfaceVariant: Colors["light"].background },
                      roundness: 8,
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                    error={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Save Button */}
                <Button
                  mode="contained"
                  theme={{ roundness: 0 }}
                  style={{ borderRadius: 8, marginTop: SIZES.width * 0.05 }}
                  dark
                  textColor="white"
                  contentStyle={{ height: 50 }}
                  onPress={() => handleSubmit()}
                  loading={isLoading}
                >
                  Save
                </Button>
              </View>
            )}
          </Formik>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["light"].secondary,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: SIZES.width * 0.05,
  },
  avtar: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
    marginBottom: SIZES.width * 0.05,
    position: "relative",
  },
  form: {
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    backgroundColor: "white",
    borderRadius: 12,
    borderColor: Colors["light"].primary,
    borderWidth: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
  },
});
