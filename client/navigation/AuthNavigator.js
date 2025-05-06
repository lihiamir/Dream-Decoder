import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import menu from './MainDrawerNavigator.js';

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Login and Register Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* Drawer Navigator for Post-Login Screens */}
          <Stack.Screen name="Drawer" component={menu} />
        </Stack.Navigator>
    );
  }