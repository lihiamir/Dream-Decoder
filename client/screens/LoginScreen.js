// screens/LoginScreen.js
import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StyleSheet } from "react-native";
import LoginForm from "../components/LoginForm";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm navigation={navigation} />
    </SafeAreaView>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
