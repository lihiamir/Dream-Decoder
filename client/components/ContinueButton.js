import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ContinueButton({ onPress, style }) {
  return (
    <TouchableOpacity style={[styles.continue, style]} onPress={onPress}>
      <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  continue: {
    width: '40%',
    height: 50,
    backgroundColor: "#240a53",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});