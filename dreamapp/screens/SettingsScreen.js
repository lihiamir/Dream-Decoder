import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles/SettingsScreenStyle";
import BackGround from "../components/Background.js";
import Menu from "../components/Menu";
import { auth } from "../config/firebase";
import { setPreferences } from "../api/auth";

export default function SettingsScreen({ navigation }) {
  const [religion, setReligion] = useState("");
  const [style, setStyle] = useState("");

  const handleSkip = () => {
    navigation.navigate("Journal");
  };

  const handleSave = async () => {
    // Save preferences logic (e.g., send to server or local storage)
    console.log("Preferences saved:", { religion, style });
    const idToken = await auth.currentUser.getIdToken(true);
    await setPreferences(idToken, religion, style)
      .then(() => {navigation.navigate("Journal")});
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackGround />

      <Text style={styles.title}>
        To provide a more meaningful experience, tell us a bit about yourself.
      </Text>
      <Text style={styles.subtitle}>
        You can skip this step and edit it later in Settings.
      </Text>

      {/* Religion Picker */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Preferred Interpretatoin:</Text>
        <Picker
          selectedValue={religion}
          onValueChange={(itemValue) => setReligion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Jewish" value="Jewish" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Atheist" value="Atheist" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Interpretation style:</Text>
        <Picker
          selectedValue={style}
          onValueChange={(itemValue) => setStyle(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Symbolic" value="Symbolic" />
          <Picker.Item label="Religious" value="Religious" />
          <Picker.Item label="Psychological" value="Psychological" />
          <Picker.Item label="No preference" value="No preference" />
        </Picker>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}