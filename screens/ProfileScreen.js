import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";
import * as Updates from "expo-updates";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import CustomButton from "../components/CustomButton";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const [cameraPermission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
    setModalVisible(false);
  };

  const openCamera = async () => {
    if (cameraPermission.status === "granted") {
      setModalVisible(false);
      // You can navigate to the camera screen or add camera functionality here
    } else {
      alert("Camera permission is required to use the camera.");
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const handleLogout = async () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    await Updates.reloadAsync();
  };
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://doc-api-oixu.onrender.com/api/users/getone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#555" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Profile</Text>
        </View>

        {/* Profile Image */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={image ? { uri: image } : require("../assets/avatar.jpg")}
            style={styles.profileImage}
          />
          <Ionicons
            name="ios-camera"
            size={30}
            color="#333"
            style={styles.cameraIcon}
          />
        </TouchableOpacity>

        {/* User Name and Email */}
        <Text style={styles.profileName}>
          {userData ? userData.name : "Your Name"}
        </Text>
        <Text style={styles.profileEmail}>
          {userData ? userData.email : "your.email@example.com"}
        </Text>

        {/* Additional User Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Phone: {userData ? userData.mobileNumber : "+123 456 7890"}
          </Text>
          {/* accountType */}
          <Text style={styles.infoText}>
            Date of Birth: {userData ? userData.dob : "01-Jan-1990"}
          </Text>
          <Text style={styles.infoText}>
            {userData ? userData.accountType.toUpperCase() : "N/A"}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Image Picker and Camera */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <CustomButton
            title="Pick an image from the camera roll"
            onPress={pickImage}
          />
          <CustomButton title="Open Camera" onPress={openCamera} />
          <CustomButton title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
