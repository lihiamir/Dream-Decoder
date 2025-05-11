import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native'; 

export default function AudioButton({ onPress, style }) {
  
  const [isRecording, setIsRecording] = React.useState(false);

  return (
    <TouchableOpacity style={[styles.audioButton, style]} onPress={onPress}>
        <Image source={require("../assets/images/mic.png")} style={styles.image}/>
    </TouchableOpacity>
  );
}   

const styles = StyleSheet.create({
  audioButton: {
    width: 60,
    height: 60,
    padding: 4,
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});