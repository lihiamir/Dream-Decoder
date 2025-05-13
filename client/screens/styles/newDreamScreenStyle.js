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
    left: -150,
    resizeMode: "contain",
    opacity: 0.4,
  },
  c2: {
    position: "absolute",
    bottom: 200,
    right: -100,
    resizeMode: "contain",
    opacity: 0.4,
  },
  voice: {
    position: "absolute",
    top: '15%',
  },
  textArea: {
    position: "relative",
    backgroundColor: "rgba(97, 54, 164, 0.2)",
    top: '15%',
    width: '80%',
    height: '15%',
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 5,

  },
  input: {
    color: "#fff",
    opacity: 1,
    fontSize: 16,
    height: '100%',
    fontWeight: "300",
    padding: 10,
  },
  continueButton: {
    position: "absolute",
    top: '55%',
  },
  steps: {
    position: "absolute",
    top: '90%',
  },
  });
