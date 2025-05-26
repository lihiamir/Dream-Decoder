import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
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
    top: '80%',
  },
  steps: {
    position: "absolute",
    top: '90%',
  },
});
