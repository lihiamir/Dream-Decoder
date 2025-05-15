import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";

////
import tempImage from "../assets/images/temp.png"; // Placeholder image for the background
////

export default function DreamScreen({ navigation, route }) {

  ////
  // const mockResult = {
  //   dreamId: "12345",
  //   scenes: [
  //     {
  //       scene: "You are walking through a beautiful forest.",
  //       image: tempImage,
  //       mood: "Peaceful",
  //       symbols: [
  //         { symbol: "Tree", meaning: "Growth and stability" },
  //         { symbol: "Bird", meaning: "Freedom and hope" },
  //       ],
  //     },
  //     {
  //       scene: "You are standing on a beach watching the sunset.",
  //       image: tempImage,
  //       mood: "Calm",
  //       symbols: [
  //         { symbol: "Sunset", meaning: "Endings and transitions" },
  //         { symbol: "Ocean", meaning: "Depth of emotions" },
  //       ],
  //     },
  //     {
  //       scene: "You are flying over a city at night.",
  //       image: tempImage,
  //       mood: "Excited",
  //       symbols: [
  //         { symbol: "City", meaning: "Community and ambition" },
  //         { symbol: "Night", meaning: "Mystery and the unknown" },
  //       ],
  //     },
  //   ],
  // };
  ////

  // const dream = mockResult; // Use the mock data
  const { user, dream } = route.params; // Get the result object from the params
  const { dreamId, scenes } = dream; // Destructure dreamId and scenes

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0); // Track the current scene index

  const handlePrevious = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  const currentScene = scenes[currentSceneIndex]; // Get the current scene

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <Image source={require("../assets/images/background.png")} style={styles.rectangle} />
      <Image source={require("../assets/images/moon.png")} style={styles.moon} />
      <Image source={require("../assets/images/c1.png")} style={styles.c1} />
      <Image source={require("../assets/images/c2.png")} style={styles.c2} />
      <Image source={require("../assets/images/c3.png")} style={styles.c3} />

      {/* Scene Details */}
      <View style={styles.sceneContainer}>

        {/* Image with Navigation Arrows */}
        <View style={styles.imageNavigationContainer}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handlePrevious}
            disabled={currentSceneIndex === 0}
          >
            <Text style={[styles.arrowText, currentSceneIndex === 0 && styles.disabledArrow]}>{"<"}</Text>
          </TouchableOpacity>

          <Image source={currentScene.image} style={styles.sceneImage} />

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleNext}
            disabled={currentSceneIndex === scenes.length - 1}
          >
            <Text style={[styles.arrowText, currentSceneIndex === scenes.length - 1 && styles.disabledArrow]}>{">"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sceneTitle}>Scene {currentSceneIndex + 1}</Text>
        <Text style={styles.sceneDescription}>{currentScene.scene}</Text>

        <Text style={styles.sceneMood}>Mood: {currentScene.mood}</Text>

        {/* Symbols */}
        <Text style={styles.symbolsTitle}>Symbols:</Text>
        <FlatList
          data={currentScene.symbols}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.symbolItem}>
              <Text style={styles.symbolName}>{item.symbol}</Text>
              <Text style={styles.symbolMeaning}>{item.meaning}</Text>
            </View>
          )}
        />
      </View>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
