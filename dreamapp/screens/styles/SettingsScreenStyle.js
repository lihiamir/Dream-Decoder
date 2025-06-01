import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "300",
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 45,
    marginTop: 120,
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 40,
    margin: 10,
  },
  pickerContainer: {
    width: "80%",
    borderRadius: 10,
    backgroundColor: "rgba(97, 54, 164, 0.4)",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    margin: 10,
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
    backgroundColor: "#240a53",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  skipButton: {
    backgroundColor: "rgb(130, 92, 191)",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 20,
  },
});