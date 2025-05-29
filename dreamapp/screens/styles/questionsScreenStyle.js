import { StyleSheet } from 'react-native'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    backgroundColor: "rgba(97, 54, 164, 0.4)",
    borderRadius: 20,
    padding: 15,
    width: "80%",
    height: "content",
    top: "30%",
    // marginBottom: 200,
  },
  question: {
    position: "relative",
    fontSize: 27,
    lineHeight: 40,
    color: "#fff",
    fontWeight: "300",
    marginBottom: 20,
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
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(97, 54, 164, 0.2)",
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
