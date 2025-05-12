import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import styles from "./styles/newDreamScreenStyle";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";
import {AudioButton, uploadRecording, audioUri} from "../components/AudioButton";
import { uploadDreamText } from "../api/dream";
import { auth } from "../config/firebase";


export default function NewDreamScreen({ navigation, route }) {

  const [audioUri, setAudioUri] = useState(null);
  const { user } = route.params;
  
  console.log(user);

  const [text, setText] = useState("");

  const handleContinue = async () => {
    // if (!audioUri && !text) {
    //   alert("Please provide either a voice recording or text input.");
    //   return;
    // }
    // const idToken = await auth.currentUser.getIdToken(true);
    // let response;
    // if (audioUri) { 
    //   response = await uploadRecording(idToken, audioUri);
    // } else {
    //   response = await uploadDreamText(idToken, {text}).catch((error) => {
    //     console.error('Error uploading recording:', error);
    //     return;
    //   });
    // }

    // if (!response) {
    //   console.error("No response received from the server.");
    //   return;
    // }
    // const result = await response.json();

    // if (result.followUp) {
    const questions = [
        "What is the significance of the book you were reading in your dream?",
        "Can you describe the field of flowers in more detail?",
        "Did you feel any specific emotions while reading the book in the field of flowers?"
    ];
    const text = "חלמתי שאני קוראת ספר בשדה של פרחים";
    navigation.navigate('QuestionsPrompt', { user: user , questions: questions, text: text});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
      <Image source={require("../assets/images/moon.png")} style={styles.moon} />

      <View style={styles.overlap}>
        <Text style={styles.description}>
          Describe your dream in detail, including major events, characters, objects, and settings
        </Text>

        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <AudioButton style={styles.voice} setAudioUri={setAudioUri} />

        <View style={styles.textArea}>
          <TextInput
            placeholder="Or type here..."
            placeholderTextColor="#FFF"
            style={styles.input}
            value={text}
            onChangeText={setText}
            multiline
          />
        </View>

        <ContinueButton style={styles.continueButton} onPress={handleContinue}/>
        
      </View>

      <Image source={require("../assets/images/step1.png")} style={styles.steps} />

      {/* Menu Button */}
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}
