import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchButton({ onPress, style }) {
  return (
    <TouchableOpacity style={[styles.continue, style]} onPress={onPress}>
      <Image source={require("../assets/images/search.png")} style={styles.icon} />
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    icon: {
        margin: 10,
        width: 24, // Adjust the size as needed
        height: 24,
        resizeMode: "contain",
    },
});