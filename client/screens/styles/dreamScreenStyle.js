import { auth } from '@/config/firebase';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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

    carouselContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    arrowButton: {
      backgroundColor: "rbg(0, 0, 0)",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      width: 50,
    },
    arrowText: {
      color: "#fff",
      fontSize: 30,
      fontWeight: "bold",
    },
    disabledArrow: {
      color: "rgba(0, 0, 0, 0)", 
    },
    interpretationText: {
      fontSize: 16,
      color: "#333",
      textAlign: "center",
    },
    similarDreamsContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    similarDreamItem: {
      backgroundColor: "#f5f5f5",
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    similarDreamText: {
      fontSize: 14,
      color: "#333",
    },
    sceneContainer: {
      flex: 1,
      top: "20%",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    imageNavigationContainer: {
      flexDirection: "row", // Align arrows and image horizontally
      alignItems: "center", // Center arrows vertically with the image
      justifyContent: "center",
      marginVertical: 20,
    },
    sceneTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    sceneDescription: {
      fontSize: 16,
      textAlign: "center",
      marginBottom: 10,
    },
    sceneImage: { 
      width: 400, // Adjust the width as needed
      height: 400, // Adjust the height as needed
      resizeMode: "contain",
      marginHorizontal: 10, // Add spacing between the image and arrows
      borderRadius: 20,
      borderWidth: 5,
      borderColor: "#000",
    },
    sceneMood: {
      fontSize: 16,
      fontStyle: "italic",
      marginBottom: 10,
    },
    symbolsTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    symbolItem: {
      marginBottom: 5,
    },
    symbolName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    symbolMeaning: {
      fontSize: 14,
      fontStyle: "italic",
    },
    navigationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 20,
      marginBottom: 20,
    },
  });