import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import styles from "./styles/FormStyles";
import { useGoogleAuth } from '../auth/googleAuth';
import { checkRegister } from '../api/auth';

export default function RegisterForm({ navigation }) { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const { promptAsync } = useGoogleAuth(navigation);


  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name, });
 
      await user.reload();
      const idToken = await auth.currentUser.getIdToken(true);
      await checkRegister(idToken); //check if token is valid with the server
      
      alert('Account created!');
      navigation.navigate('Drawer', { user: user });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background & top graphics */}
      <Image source={require('../assets/images/background.png')} style={styles.rectangle} />
      <Image source={require('../assets/images/backRegister.png')} style={styles.vector} />
      <Image source={require('../assets/images/moon.png')} style={styles.regMoon} />

      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/userIcon.png')} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={name}
            placeholder="Your Name"
            placeholderTextColor="#351b64"
            onChangeText={setname}
             />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/emailIcon.png')} style={styles.icon} />
          <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#351b64"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
           />
        </View>

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

        {/* Register button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Login link */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
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
}