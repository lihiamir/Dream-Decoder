// App.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import NewDreamScreen from "./screens/NewDreamScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NewDream" component={NewDreamScreen} />
      </Stack.Navigator>
  );
}
