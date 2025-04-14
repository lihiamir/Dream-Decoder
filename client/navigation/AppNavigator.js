import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DreamInputScreen from '../screens/DreamInputScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Enter Dream" component={DreamInputScreen} />
      <Stack.Screen name="Results" component={ResultScreen} />
    </Stack.Navigator>
  );
}
