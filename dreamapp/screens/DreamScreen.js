import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";
import Background from "../components/Background.js";
import { auth } from "../config/firebase";
import {getSimilarDreams, getDreamById} from "../api/dream";

export default function DreamScreen({ navigation, route }) {
  const { dream } = route.params;
  const scenes = dream.scenes || [];
  const dreamId = dream.id;
  console.log("dreamId:", dreamId);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [similarDreams, setSimilarDreams] = useState([]);

  const fetchSimilarDreams = async () => {
    const idToken = await auth.currentUser.getIdToken(true);
    const response = await getSimilarDreams(idToken, dreamId);
    console.log("Similar Dreams Response:", response);
    if (response && response.recommendations) {
      setSimilarDreams(response.recommendations);
      console.log("Similar Dreams:", similarDreams);
    } else {
      setSimilarDreams([]);
      console.error("Failed to fetch similar dreams");
    }
  }

  useEffect(() => {
  if (dreamId) {
    setCurrentSceneIndex(0);
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

  const handleDreamPress = async (dreamId) => {
    const idToken = await auth.currentUser.getIdToken();
    const dream = await getDreamById(idToken, dreamId);
    if (dream) {
      setCurrentSceneIndex(0);
      navigation.navigate("Dream", { dream: dream });
    }
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
            {currentScene.symbols && currentScene.symbols.length > 0 ? (
              currentScene.symbols.map((item, index) => (
                <View key={index} style={styles.symbolItem}>
                  <Text style={styles.symbolName}>{item.symbol}</Text>
                  <Text style={styles.symbolMeaning}>{item.meaning}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSymbolsText}>No symbols found.</Text>
            )}
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
                  <Image source={{uri: item.image}} style={styles.similarDreamThumbnail} />
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
