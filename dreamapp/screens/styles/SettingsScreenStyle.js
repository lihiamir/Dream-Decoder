import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  rectangle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  vector: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "30%",
    resizeMode: "contain",
  },
  logMoon: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 120,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#351b64",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipButton: {
    backgroundColor: "#aaa",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});