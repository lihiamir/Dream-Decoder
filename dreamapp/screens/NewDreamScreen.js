import React, {useState} from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import styles from "./styles/newDreamScreenStyle";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";
import {AudioButton, uploadRecording} from "../components/AudioButton";
import { uploadDreamText } from "../api/dream";
import { auth } from "../config/firebase";
import Background from "../components/Background.js"; // Import Background component



export default function NewDreamScreen({ navigation }) {
  const [audioUri, setAudioUri] = useState(null);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleContinue = async () => {
    if (!audioUri && !text) {
      alert("Please provide either a voice recording or text input.");
      return;
    }
    const idToken = await auth.currentUser.getIdToken(true);
    let response;
    if (audioUri) { 
      response = await uploadRecording(idToken, audioUri);
    } else {
      response = await uploadDreamText(idToken, {text}).catch((error) => {
        console.error('Error uploading recording:', error);
        return;
      });
    }

    if (!response) {
      console.error("No response received from the server.");
      return;
    }

    if (response.followUp) {

    // const questions = [
    //     "What is the significance of the book you were reading in your dream?",
    //     "Can you describe the field of flowers in more detail?",
    //     "Did you feel any specific emotions while reading the book in the field of flowers?"
    // ];
    // const ogText = "חלמתי שאני קוראת ספר בשדה של פרחים";
    // navigation.navigate('QuestionsPrompt', { questions: questions, text: ogText});

      const questions = response.questions;
      const ogText = response.originalText;
      setText("");
      setAudioUri(null);
      navigation.navigate("QuestionsPrompt", { questions: questions, text: ogText });
    } else {
      navigation.navigate("Dream", { response: response });
    };
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Background />

      <Text style={styles.description}>
      Describe your dream in detail, including major events, characters, objects, and settings.
      </Text>
      <AudioButton style={styles.voice} setAudioUri={setAudioUri} />

      <View style={styles.textArea}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View pointerEvents="none">
            <TextInput
              placeholder="Or type here..."
              placeholderTextColor="#FFF"
              style={styles.input}
              value={text}
              editable={false}
              multiline
            />
          </View>
        </TouchableOpacity>
      </View>

      <ContinueButton style={styles.continueButton} onPress={handleContinue}/>
      <Image source={require("../assets/images/step1.png")} style={styles.steps} />

      {/* Menu Button */}
      <Menu navigation={navigation} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Describe your dream</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="I was dreaming that I..."
                  placeholderTextColor="#888"
                  value={text}
                  onChangeText={setText}
                  multiline
                  autoFocus
                  scrollEnabled={true}
                  textAlignVertical="top"
                />
                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
