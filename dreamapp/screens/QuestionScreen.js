import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import styles from "./styles/questionsScreenStyle";
import {AudioButton, uploadAnswers} from "../components/AudioButton";
import ContinueButton from "../components/ContinueButton";
import { auth } from "../config/firebase";
import LoadingScreen from "../components/LoadingScreen";
import Background from "../components/Background.js"; // Import Background component



export default function QuestionScreen({ navigation, route }) {
  const { user, questions, text } = route.params;
  const questionArray = Object.values(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [audioUri, setAudioUri] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleContinue = async () => {
    if (!audioUri && !textAnswer) {
      alert("Please provide either a voice recording or text input.");
      return;
    }
    // Save the current answer
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: audioUri
        ? { type: "audio", uri: audioUri }
        : { type: "text", text: textAnswer },
    }));

    // Move to the next question or finish
    if (currentQuestionIndex < questionArray.length - 1) {
      // Reset the input fields
      setAudioUri(null);
      setTextAnswer("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);

    } else {
      // All questions answered, send answers to the server
      try {
        console.log("Uploading answers:", answers);
        setLoading(true); // Show loading screen
        const idToken = await auth.currentUser.getIdToken();
        const response = await uploadAnswers(idToken, Object.values(answers), text);

        console.log("Server response:", response);

      // Navigate to the Dream screen with the server response
      navigation.getParent().navigate("Dream", { user: user, dream: response });

      } catch (error) {
        console.error("Error uploading answers:", error);
        alert("Failed to upload answers. Please try again.");
        // navigation.navigate("Dream", { user: user, response: {} });

      } finally {
        setLoading(false); // Hide loading screen
      }
    };
  };


  if (loading) {
    // Show loading screen while waiting for the server response
    return <LoadingScreen message="Creating your new dream..." />;
  }


  return (
    <SafeAreaView style={styles.container}>
      <Background />

        <View style={styles.overlap}>
          <Text style={styles.question}>
            {questionArray[currentQuestionIndex]} {/* Display the current question */}
          </Text>

          <View style={styles.textArea}>
            <TextInput
              placeholder="Or type here..."
              placeholderTextColor="#fff"
              style={styles.input}
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              />
            <AudioButton style={styles.audioButton} setAudioUri={setAudioUri}/>
          </View>

      </View>
      <ContinueButton style={styles.continueButton} onPress={handleContinue}/>

      <Image source={require("../assets/images/step2.png")} style={styles.steps}/>

      {/* <Menu navigation={navigation} /> */}
          
    </SafeAreaView>
  );
}