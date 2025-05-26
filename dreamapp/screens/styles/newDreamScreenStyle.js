import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  description: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 45,
    marginTop: 120,
  },
  voice: {
    margin: 25,
  },
  textArea: {
    backgroundColor: "rgba(97, 54, 164, 0.2)",
    width: '80%',
    height: '20%',
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 5,
    margin: 10,
  },
  input: {
    color: "#fff",
    fontSize: 16,
    height: '100%',
    textAlignVertical: "top",
    fontWeight: "300",
    padding: 10,
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
