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
  header: {
    position: "relative",
    top: "20%",
    fontSize: 40,
    color: "#fff",
    fontWeight: "300",
    textAlign: "center",
    marginHorizontal: 46,
    marginTop: 0,
    marginBottom: 20,
  },
  textWrapper: {
    position: "relative",
    top: "20%",
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
    textAlign: "center",
    marginHorizontal: 46,
    lineHeight: 50,
    marginTop: 0,
    marginBottom: 20,
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
