import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet} from "react-native";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import mime from 'mime';
import { uploadDreamAudio } from '../api/dream';
import { auth } from "../config/firebase";


function AudioButton({ onPress, style, setAudioUri }) {
  
  const [recording, setRecording] = useState(null);
  // const [audioUri, setAudioUri] = useState(null);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    if (!recording) return;
    
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (uri) {
      setAudioUri(uri);
      console.log('Recording stopped and stored at', uri);
    }
    setRecording(null);
  };


  return (
    <TouchableOpacity
      style={[styles.audioButton, style]}
      onPress={recording ? stopRecording : startRecording}>
        <Image
          source={recording ? require("../assets/images/micOn.png") : require("../assets/images/micOff.png")}
          style={styles.image}/>
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


async function uploadRecording(idToken, audioUri) {
  if (!audioUri) return;
  
  const fileInfo = await FileSystem.getInfoAsync(audioUri);
  const fileType = mime.getType(fileInfo.uri);
  const data = new FormData();
  data.append('audio', {
    uri: fileInfo.uri,
    name: 'dream-audio.mp3',
    type: fileType || 'audio/mpeg',
  });

  await uploadDreamAudio(idToken, data)
    .then((response) => {
      console.log('Recording uploaded successfully:', response);
    })
    .catch((error) => {
      console.error('Error uploading recording:', error);
    });
};

export { AudioButton, uploadRecording };