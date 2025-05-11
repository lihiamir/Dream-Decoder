import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import styles from "./styles/dreamScreenStyle";
import Menu from "../components/Menu";

export default function DreamScreen({ navigation, route }) {
  const { user } = route.params;
//   const { dream } = route.params;
//   const interpetation = dream.interpetation;

  return (
    <SafeAreaView style={styles.container}>
        {/* Background */}
        <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />
          
        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/c3.png")} style={styles.c3} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Dream Interpretation Section */}
        <View style={styles.interpretationContainer}>
          {/* <Image source={require('../assets/images/dreamImage.png')} style={styles.dreamImage} /> */}
          
          <Text style={styles.sectionTitle}>Interpretation</Text>
          <Text style={styles.interpretationText}>
            <Text style={styles.boldText}>The Bed</Text>: The bed in a dream symbolizes rest or refuge, but it can also point to a feeling of instability or a need for change in the current situation.
          </Text>
          <Text style={styles.interpretationText}>
            <Text style={styles.boldText}>Flying out the Window</Text>: Flying symbolizes freedom, escaping limitations, and a desire to grow and evolve beyond what is familiar.
          </Text>
          <Text style={styles.interpretationText}>
            <Text style={styles.boldText}>Red Flowers</Text>: Red flowers represent passion, creativity, and new life – a sense of growth or potential that has yet to be fully realized.
          </Text>
          
        </View>

        {/* Similar Dreams Section */}
        <View style={styles.similarDreamsContainer}>
          <Text style={styles.sectionTitle}>Similar dreams</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarDreamsScroll}>
            
          </ScrollView>
        </View>
      </ScrollView>
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
