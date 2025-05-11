import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import styles from "./styles/newDreamScreenStyle";
import ContinueButton from "../components/ContinueButton";
import Menu from "../components/Menu";
import AudioButton from "../components/AudioButton";

export default function NewDreamScreen({ navigation, route }) {
  const { user } = route.params;
  console.log(user);

  const [text, setText] = React.useState("");


  const handleContinue = () => {
    navigation.navigate('QuestionsPrompt', { user: user });
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
        <AudioButton style={styles.voice} />

        <View style={styles.textArea}>
          <TextInput
            placeholder="Or type here..."
            placeholderTextColor="#FFF"
            style={styles.input}
            value={text}
            onChange={text => setText(text)}
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
