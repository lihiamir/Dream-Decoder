import React from "react";
import { SafeAreaView, Text, ActivityIndicator, StyleSheet, Image, View } from "react-native";

export default function LoadingScreen({ message }) {
  return (
    <SafeAreaView style={styles.container}>
        {/* Background */}
        <Image source={require("../assets/images/background.png")} style={styles.rectangle} />
        <Image source={require("../assets/images/moon.png")} style={styles.moon} />
        <Image source={require("../assets/images/c1.png")} style={styles.c1} />
        <Image source={require("../assets/images/c2.png")} style={styles.c2} />
        <Image source={require("../assets/images/c3.png")} style={styles.c3} />
        <View style={styles.overlay}>
            <Text style={styles.loadingText}>{message || "Loading..."}</Text>
            <ActivityIndicator size="large" color="#6200ee" />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
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
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        fontSize: 22,
        color: "#fff",
        marginBottom: 20,
        textAlign: "center",
    },
});