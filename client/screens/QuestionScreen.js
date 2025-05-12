import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from "react-native";
// import styles from "./styles/questionsPromptScreenStyle";
import {AudioButton, uploadRecording, audioUri} from "../components/AudioButton";
import { uploadDreamText } from "../api/dream";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";
import { auth } from "../config/firebase";

export default function QuestionScreen({ navigation, route }) {
  const { user, questions, text } = route.params;
  const questionArray = Object.values(questions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question
  const [answers, setAnswers] = useState({}); // Store the user's answers
  const [audioUri, setAudioUri] = useState(null); // Store the recorded audio URI
  const [textAnswer, setTextAnswer] = useState(""); // Store the typed answer


  const handleContinue = () => {
    // Save the current answer
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: audioUri || textAnswer, // Save either the audio URI or the text answer
    }));

    // Reset the input fields
    setAudioUri(null);
    setTextAnswer("");

    // Move to the next question or finish
    if (currentQuestionIndex < questionArray.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions answered, navigate to the next screen or handle the answers
        console.log("All answers:", answers);
        navigation.navigate("Dream", { user : user});
      }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
            <Image source={require("../assets/images/moon.png")} style={styles.moon} />
                
            <Image source={require("../assets/images/c1.png")} style={styles.c1} />
            <Image source={require("../assets/images/c2.png")} style={styles.c2} />
            <Image source={require("../assets/images/c3.png")} style={styles.c3} />
            
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
                    <AudioButton style={styles.audioButton} setAudioUri={setAudioUri} /> {/* Record audio */}

                </View>
          </View>
    
          <ContinueButton style={styles.continueButton} onPress={handleContinue}/>
          <Menu navigation={navigation} />

          <Image source={require("../assets/images/step2.png")} style={styles.steps} />
          
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column", // Stack children vertically
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
    overlap: {
        position: "absolute",
        backgroundColor: "rgba(97, 54, 164, 0.2)",
        borderRadius: 20,
        padding: 20,
        width: "70%",
        height: "content",
        justifyContent: "center",
        alignItems: "center",
        top: "20%",
        
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
      margin: 10,
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
      margin: 20,
    },
    steps: {
      position: "relative",
      margin: 20,
      },
  });
