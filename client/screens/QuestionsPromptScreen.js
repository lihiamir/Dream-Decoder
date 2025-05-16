import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./styles/questionsPromptScreenStyle";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";

export default function QuestionPromptScreen({ navigation, route }) {
  const { user, questions, text } = route.params;

  console.log(route.params); // Log the user object to check its structure

  const handleContinue = () => {
    navigation.navigate("QuestionScreen", { user: user, questions: questions, text: text });
  }

  return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />
        
        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/c3.png")} style={styles.c3} />

        <Text style={styles.header}>Hi {user.displayName}!</Text>
        <Text style={styles.textWrapper}>It looks like there are details in your dream that could use a bit more clarity for better visualization.
        {"\n"}Can I ask you a few quick questions?</Text>

        <ContinueButton style={styles.continueButton} onPress={handleContinue}/>
        {/* <Menu navigation={navigation} /> */}
        
        <Image source={require("../assets/images/step2.png")} style={styles.steps} />
        
      </SafeAreaView>
  );
}
