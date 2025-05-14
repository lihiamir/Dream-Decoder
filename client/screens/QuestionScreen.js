import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput } from "react-native";
// import styles from "./styles/questionsPromptScreenStyle";
import {AudioButton, uploadAnswers} from "../components/AudioButton";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";
import { auth } from "../config/firebase";

export default function QuestionScreen({ navigation, route }) {
  const { user, questions, text } = route.params;
  const questionArray = Object.values(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const [audioUri, setAudioUri] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");


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

    // Reset the input fields
    setAudioUri(null);
    setTextAnswer("");

    // Move to the next question or finish
    if (currentQuestionIndex < questionArray.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, send answers to the server
        try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await uploadAnswers(idToken, Object.values(answers));

        console.log("Server response:", response);

      // Navigate to the Dream screen with the server response
        // navigation.navigate("Dream", { user: user, response: response });
      } catch (error) {
        console.error("Error uploading answers:", error);
        alert("Failed to upload answers. Please try again.");
        navigation.navigate("Dream", { user: user, response: {} });
      }
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/background.png')} style={styles.rectangle}/>
      <Image source={require("../assets/images/moon.png")} style={styles.moon}/>
                
      <Image source={require("../assets/images/c1.png")} style={styles.c1}/>
      <Image source={require("../assets/images/c2.png")} style={styles.c2}/>
      <Image source={require("../assets/images/c3.png")} style={styles.c3}/>

        <View style={styles.overlap}>
          <Text style={styles.question}>
            {questionArray[currentQuestionIndex]} {/* Display the current question */}
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Or type here..."
              placeholderTextColor="#fff"
              style={styles.textInput}
              value={textAnswer}
              onChangeText={setTextAnswer}
              multiline
              />
            <AudioButton style={styles.audioButton} setAudioUri={setAudioUri}/>
          </View>

      </View>
      <ContinueButton style={styles.continueButton} onPress={handleContinue}/>

      <Image source={require("../assets/images/step2.png")} style={styles.steps}/>

      <Menu navigation={navigation} />
          
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        height: "100%",
      },
    rectangle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
    moon: {
        width: '75%',
        height: '75%',
        position: "absolute",
        top: "-55%",
        resizeMode: "contain",
        },
    c1: {
        position: "absolute",
        top: 180,
        left: -140,
        resizeMode: "contain",
        opacity: 0.4,
        },
    c2: {
        position: "absolute",
        bottom: 220,
        right: -85,
        resizeMode: "contain",
        opacity: 0.4,
    },
    c3: {
        position: "absolute",
        bottom: -200,
        opacity: 0.4,
    },
    form: {
      flexDirection: "column", // Stack children vertically
      justifyContent: "center",
      alignItems: "center", // Center items horizontally
      paddingTop: "20%", // Add padding at the bottom
      width: "100%", // Full width of the screen
      },

    overlap: {
        position: "absolute",
        backgroundColor: "rgba(97, 54, 164, 0.2)",
        borderRadius: 20,
        padding: 20,
        width: "70%",
        height: "content",
        top: "20%",
        marginBottom: 200,
    },
    question: {
      position: "relative",
      fontSize: 30,
      color: "#fff",
      fontWeight: "300",
      margin: 20,
      textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
    audioButton: {
      marginLeft: 10,
    },
    textInput: {
        flex: 1,
        height: "100%",
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "rgba(97, 54, 164, 0.2)",
    },
    continueButton: {
      position: "absolute",
      top: '70%',
    },
    steps: {
      position: "absolute",
      top: '90%',
      },
  });
