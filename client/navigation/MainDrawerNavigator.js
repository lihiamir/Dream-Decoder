import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DreamScreen from "../screens/DreamScreen";
import LoginScreen from "../screens/LoginScreen";
import NewDreamStack from "./NewDreamStack";
import JournalScreen from "../screens/JournalScreen";
import { auth } from "../config/firebase";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator({ route, navigation }) {
  const { user } = route.params;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Drawer.Navigator initialRouteName="New Dream" screenOptions={{ headerShown: false,
      drawerStyle: {
        backgroundColor: '#1e1e1e', // dark background
        width: 260,
      },
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#aaa',
      drawerLabelStyle: {
        fontSize: 16,
      }, }}>
      <Drawer.Screen name="New Dream" component={NewDreamStack} initialParams={{ user: user }} />
      <Drawer.Screen name="dream" component={DreamScreen} initialParams={{ user: user }} />
      <Drawer.Screen name="Journal" component={JournalScreen} initialParams={{ user: user }} />
      <Drawer.Screen
        name="Log out"
        component={LoginScreen}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}