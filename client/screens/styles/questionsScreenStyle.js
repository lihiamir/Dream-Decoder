import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
    form: {
      flexDirection: "column", // Stack children vertically
      justifyContent: "center",
      alignItems: "center", // Center items horizontally
      paddingTop: "20%", // Add padding at the bottom
      width: "100%", // Full width of the screen
      },

    overlap: {
        position: "absolute",
        backgroundColor: "rgba(97, 54, 164, 0.2)",
        borderRadius: 20,
        padding: 20,
        width: "70%",
        height: "content",
        top: "20%",
        marginBottom: 200,
    },
    question: {
      position: "relative",
      fontSize: 30,
      color: "#fff",
      fontWeight: "300",
      margin: 20,
      textAlign: "center",
    },
    textArea: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
    audioButton: {
      marginLeft: 10,
    },
    input: {
        flex: 1,
        height: "100%",
        color: "#fff",
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "rgba(97, 54, 164, 0.2)",
    },
    continueButton: {
      position: "absolute",
      top: '70%',
    },
    steps: {
      position: "absolute",
      top: '90%',
      },
  });
