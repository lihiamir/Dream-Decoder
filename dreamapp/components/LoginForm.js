import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "./styles/FormStyles";
import { useGoogleAuth } from '../config/googleAuth';
import { checkLogin } from "../api/auth";


export default function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { promptAsync } = useGoogleAuth(navigation);

  const handleLogin = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      await checkLogin(idToken); //check if token is valid with the server
      navigation.navigate('Drawer');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
      <Image source={require('../assets/images/backLogin.png')} style={styles.vector} />
      <Image source={require('../assets/images/moon.png')} style={styles.logMoon} />
      
      <Text style={styles.title}>Welcome Back</Text> 
      <Text style={styles.subtitle}>Log in to your account</Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>

          {/* email */}
          <Image source={require('../assets/images/userIcon.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#351b64"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/passIcon.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#351b64"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Forgot Password */}
        <View style={styles.row}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Register link */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Or with Google/Apple */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <View style={styles.orTextContainer}>
            <Text style={styles.orText}>Or continue with</Text>
          </View>
        </View>

        <View style={styles.authIcons}>
          <TouchableOpacity style={styles.authIconButton} onPress={() => promptAsync()}>
            <Image source={require('../assets/images/google.png')} style={styles.authIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.authIconButton}>
            <Image source={require('../assets/images/apple.png')} style={styles.authIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
