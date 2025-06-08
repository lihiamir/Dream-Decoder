import React from "react";
import { SafeAreaView, Text, ActivityIndicator, StyleSheet, View, TouchableOpacity } from "react-native";
import Background from "./Background";

export default function LoadingScreen({ message, onBack }) {
  return (
    <SafeAreaView style={styles.container}>
        <Background />
        <View style={styles.overlay}>
            <Text style={styles.loadingText}>{message || "Loading..."}</Text>
            <ActivityIndicator size="large" color="#6200ee" />
            {onBack && (
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>Back to Journal</Text>
              </TouchableOpacity>
            )}
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
        top: "-45%",
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
    backButton: {
        marginTop: 24,
        paddingVertical: 10,
        paddingHorizontal: 24,
        backgroundColor: "#351b64",
        borderRadius: 20,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
});