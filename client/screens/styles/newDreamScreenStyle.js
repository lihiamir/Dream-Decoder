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
      width: 390,
      height: 390,
      position: "absolute",
      top: -200,
      textAlign: "center",

    },
    overlap: {
      position: "absolute",
      top: 200,
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    description: {
      fontSize: 32,
      color: "#fff",
      fontWeight: "300",
      textAlign: "center",
      marginHorizontal: 46,
      lineHeight: 42,
      marginTop: 0,
      marginBottom: 20,
    },
    c1: {
      position: "absolute",
      top: 195,
      left: 0,
      width: 276,
      height: 448,
      resizeMode: "cover",
      opacity: 0.5,
      
    },
    c2: {
      position: "absolute",
      bottom: 200,
      right: 0,
      width: 238,
      height: 104,
      resizeMode: "cover",
      opacity: 0.5,
    },
    voice: {
      position: "relative",
      top: '10%',
    },
    textArea: {
      position: "relative",
      top: '15%',
      width: '80%',
      height: '15%',
      borderWidth: 2,
      borderColor: "#FFF",
      borderRadius: 5,

    },
    input: {
      color: "#fff",
      fontSize: 16,
      height: '100%',
      fontWeight: "300",
      padding: 10,
    },
    continue: {
      position: "relative",
      top: '20%',
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
    steps: {
      position: "relative",
      top: '30%',
    },
    menu: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 30,
      resizeMode: "contain",
      margin: 20,
    },
  });
  