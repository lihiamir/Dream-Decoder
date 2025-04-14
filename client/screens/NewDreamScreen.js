import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles/newDreamScreenStyle";

export default function NewDreamScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/rectangle7.png')} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />

      <View style={styles.overlap}>
        <Text style={styles.description}>
          Describe your dream in detail, including major events, characters, objects, and settings
        </Text>

        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/voice-off.png")} style={styles.voice} />

        <View style={styles.textArea}>
          <TextInput
            placeholder="Or type here..."
            placeholderTextColor="#FFF"
            style={styles.input}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.continue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <Image source={require("../assets/images/step1.png")} style={styles.steps}/>
      </View>
    <Image source={require("../assets/images/menu.png")} style={styles.menu} />
    </View>
  );
}
