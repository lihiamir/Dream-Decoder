import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "./styles/questionsPromptScreenStyle";
import ContinueButton from "../components/ContinueButton";
import Background from "../components/Background.js"; // Import Background component
import { getUserDisplayName } from "../api/auth.js";
import { auth } from "../config/firebase"; // Import Firebase auth

export default function QuestionPromptScreen({ navigation, route }) {
  const { questions, text } = route.params;
  const [userName, setUserName] = useState(""); // Default state while fetching

  
  const fetchUserName = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await getUserDisplayName(idToken); // Fetch the user's display name from the server
      setUserName(response.displayName || "You"); // Set the user's name or fallback to "You"
    } catch (error) {
      console.error("Error fetching user name:", error);
      setUserName("You"); // Fallback in case of an error
    }
  };

  useEffect(() => {
    fetchUserName(); // Fetch the user's name when the component mounts
  }, []);

  const handleContinue = () => {
    navigation.navigate("QuestionScreen", { questions: questions, text: text });
  }

  return (
      <SafeAreaView style={styles.container}>
        <Background />

        <Text style={styles.header}>Hi {userName}!</Text>
        <Text style={styles.textWrapper}>It looks like there are details in your dream that could use a bit more clarity for better visualization.
        {"\n"}Can I ask you a few quick questions?</Text>

        <ContinueButton style={styles.continueButton} onPress={handleContinue}/>
        {/* <Menu navigation={navigation} /> */}
        
        <Image source={require("../assets/images/step2.png")} style={styles.steps} />
        
      </SafeAreaView>
  );
}
