// screens/RegisterScreen.js
import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, StyleSheet } from "react-native";
import RegisterForm from "../components/RegisterForm";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm navigation={navigation} />
    </SafeAreaView>
  );
}
RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
