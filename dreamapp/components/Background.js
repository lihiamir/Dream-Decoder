import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Background() {
    return (
        <>
        <Image source={require("../assets/images/background.png")} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />
        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/c3.png")} style={styles.c3} />
        </>
    );
}

const styles = StyleSheet.create({
    rectangle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
      resizeMode: 'cover',
    },
    moon: {
      width: '80%',
      height: '80%',
      position: "absolute",
      top: "-45%",
      resizeMode: "contain",
        },
      c1: {
          position: "absolute",
          top: 100,
          left: -140,
          width: 400,
          resizeMode: "contain",
          opacity: 0.4,
        },
      c2: {
          position: "absolute",
          top: 400,
          right: -100,
          width: 250,
          resizeMode: "contain",
          opacity: 0.4,
        },
      c3: {
          position: "absolute",
          bottom: -200,
          opacity: 0.4,
        },
})