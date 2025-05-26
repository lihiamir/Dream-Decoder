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
      top: "10%",
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
    
    sceneImage: { 
      width: 300, // Adjust the width as needed
      height: 300, // Adjust the height as needed
      resizeMode: "contain",
      marginHorizontal: 10, // Add spacing between the image and arrows
      borderRadius: 20,
      borderWidth: 5,
      borderColor: "#000",
    },
    interpretationContainer: {
      flex: 1,
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: "rgba(97, 54, 164, 0.2)", // Semi-transparent white background
      borderRadius: 20,
    },
    sceneDescription: {
      fontSize: 20,
      textAlign: "center",
      marginBottom: 10,
      color: "#fff",
      fontWeight: "bold",
      lineHeight: 30,
    },
    sceneMood: {
      fontSize: 16,
      fontStyle: "italic",
      marginVertical: 10,
      color: "#fff",
      textAlign: "center",
    },
    symbolsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 10,
      marginLeft: 10,
      color: "#fff",
      textAlign: "center",
    },
    symbolItem: {
      marginHorizontal: 10,
      marginVertical: 7,
    },
    symbolName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 5,
    },
    symbolMeaning: {
      fontSize: 16,
      color: "#fff",
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