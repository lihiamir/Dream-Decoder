import React, {useState, useRef} from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";

export default function DreamScreen({ navigation, route }) {
  const { user, dream } = route.params; // Get user and dream data from route params
  const { pictures, interpretations, similarDreams } = {pictures:["","",""], interpretations:["","",""], similarDreams:["","",""]}; // Extract pictures, interpretations, and similar dreams

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current picture index
  const flatListRef = useRef(null); // Reference to the FlatList

  // Navigate to the previous picture
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  // Navigate to the next picture
  const handleNext = () => {
    if (currentIndex < pictures.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        {/* Background */}
        <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />
          
        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/c3.png")} style={styles.c3} />

      {/* Horizontal Picture and Interpretation Section */}
      <View style={styles.carouselContainer}>
        {/* Navigation Arrows */}
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevious} disabled={currentIndex === 0}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={pictures}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setCurrentIndex(index);
          }}
          renderItem={({ item, index }) => (
            <View style={styles.pictureContainer}>
              <Image source={{ uri: item }} style={styles.picture} />
              <Text style={styles.interpretationText}>{interpretations[index]}</Text>
            </View>
          )}
        />

        <TouchableOpacity style={styles.arrowButton} onPress={handleNext} disabled={currentIndex === pictures.length - 1}>
          <Text style={styles.arrowText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Similar Dreams Section */}
      <View style={styles.similarDreamsContainer}>
        <Text style={styles.sectionTitle}>Similar Dreams</Text>
        <FlatList
          data={similarDreams}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.similarDreamItem}>
              <Text style={styles.similarDreamText}>{item}</Text>
            </View>
          )}
        />
      </View>

      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
