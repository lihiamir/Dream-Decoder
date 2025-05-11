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
    if (!audioUri && !text) {
      alert("Please provide either a voice recording or text input.");
      return;
    }
    const idToken = await auth.currentUser.getIdToken(true);

    if (audioUri) { 
      const response = await uploadRecording(idToken, audioUri);
    } else if (text) {
      const response = await uploadDreamText(idToken, text).catch((error) => {
        console.error('Error uploading recording:', error);
      });
        return;
      }
    const result = await response.json();
    if (result.followUp) {
      navigation.navigate('QuestionsPrompt', { user: user , questions: result.questions, text: result.originalText});

    }


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
