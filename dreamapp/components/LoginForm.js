import React, { useState, useEffect } from "react";
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
  const [showPassword, setShowPassword] = useState(false);
  // const { promptAsync } = useGoogleAuth(navigation);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('Drawer'); // or navigation.navigate('Drawer')
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const idToken = await auth.currentUser.getIdToken(true);
      await checkLogin(idToken);
      navigation.navigate('Drawer');
    } catch (error) {
      alert(error.message);
      await auth.signOut();
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
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Image
              source={
                showPassword
                  ? require('../assets/images/eye-closed.png')
                  : require('../assets/images/eye-open.png')
              }
              style={{ width: 24, height: 24, tintColor: "#351b64" }}
            />
          </TouchableOpacity>
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
        {/* <View style={styles.orContainer}>
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
        </View> */}
      </View>
    </View>
  );
};
