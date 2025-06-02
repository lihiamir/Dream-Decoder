import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";
import Background from "../components/Background.js";
import tempImage from "../temp.png";
import { auth } from "../config/firebase"; // Import Firebase auth
import {getSimilarDreams} from "../api/dream"; // Import the function to fetch similar dreams

export default function DreamScreen({ navigation, route }) {
  const { dream } = route.params;
  
  const scenes = dream.scenes || [];
  const dreamId = dream.id; // Assuming dream has an id property
  console.log("dreamId:", dreamId);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [similarDreams, setSimilarDreams] = useState([]);

  const fetchSimilarDreams = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const resposne = await getSimilarDreams(idToken, dreamId);
    console.log("Similar Dreams Response:", resposne);
    if (resposne) {
      setSimilarDreams(resposne);
    } else {
      console.error("Failed to fetch similar dreams");
    }
  }

  useEffect(() => {
  if (dreamId) {
    fetchSimilarDreams();
  }
}, [dreamId]);


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

          {currentScene && currentScene.image ? (
            <Image source={{ uri: currentScene.image }} style={styles.sceneImage} />
          ) : null}

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

            {/* Symbols */}
            <Text style={styles.symbolsTitle}>Symbols </Text>
            <FlatList
              data={currentScene.symbols}
              Vertical
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.symbolItem}>
                  <Text style={styles.symbolName}>{item.symbol}</Text>
                  <Text style={styles.symbolMeaning}>{item.meaning}</Text>
                </View>
              )}
              nestedScrollEnabled={true}
            />
          </ScrollView>
        </View>

        {/* Similar Dreams Section */}
        <View style={styles.similarDreamsContainer}>
          <Text style={styles.similarDreamsTitle}>Similar Dreams</Text>
          <FlatList
            data={similarDreams}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item && item.image ? (
                <TouchableOpacity onPress={() => handleDreamPress(item.id)} style={styles.similarDreamThumbnailContainer}>
                  <Image source={item.image} style={styles.similarDreamThumbnail} />
                </TouchableOpacity>
              ) : null
            }
            contentContainerStyle={styles.similarDreamsList}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        
      </View>
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
