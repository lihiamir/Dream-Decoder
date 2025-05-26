import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";
import Background from "../components/Background.js"; // Import Background component


export default function DreamScreen({ navigation, route }) {
  const { scenes } = route.params.dream; // Assuming the dream object is passed via navigation
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

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
      <Background />
      
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

          <Image source={{ uri: currentScene.image }} style={styles.sceneImage} />

          <TouchableOpacity
            style={styles.arrowButton}
            onPress={handleNext}
            disabled={currentSceneIndex === scenes.length - 1}
          >
            <Text style={[styles.arrowText, currentSceneIndex === scenes.length - 1 && styles.disabledArrow]}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <View style={styles.interpretationContainer}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
              nestedScrollEnabled={true} // Allow nested scrolling
            />
          </ScrollView>
        </View>
      </View>
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
