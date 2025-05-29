import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";
import Background from "../components/Background.js";
import tempImage from "../temp.png";

export default function DreamScreen({ navigation, route }) {
  const { scenes } = route.params.dream;
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  // Mock data for similar dreams
  const similarDreams = [
    { id: "1", image: tempImage },
    { id: "2", image: tempImage },
    { id: "3", image: tempImage },
    { id: "4", image: tempImage },
    { id: "5", image: tempImage },
  ];

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

  const currentScene = scenes[currentSceneIndex];

  const handleDreamPress = (dreamId) => {
    // Navigate to the selected dream
    navigation.navigate("Dream", { dreamId });
  };

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
            <Text style={styles.symbolsTitle}>Symbols </Text>
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
          {/* Similar Dreams Section */}
          <View style={styles.similarDreamsContainer}>
              <Text style={styles.similarDreamsTitle}>Similar Dreams</Text>
              <FlatList
                data={similarDreams}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleDreamPress(item.id)} style={styles.similarDreamThumbnailContainer}>
                    <Image source={item.image} style={styles.similarDreamThumbnail} />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.similarDreamsList}
                showsHorizontalScrollIndicator={false}
              />
            </View>
        </View>

        
      </View>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
