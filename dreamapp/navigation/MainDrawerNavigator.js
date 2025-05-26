import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DreamScreen from "../screens/DreamScreen";
import LoginScreen from "../screens/LoginScreen";
import QuestionsPromptScreen from "../screens/QuestionsPromptScreen";
import QuestionScreen from "../screens/QuestionScreen";

import NewDreamStack from "./NewDreamStack";
import NewDreamScreen from "../screens/NewDreamScreen";
import JournalScreen from "../screens/JournalScreen";
import { auth } from "../config/firebase";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator({ route, navigation }) {

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Drawer.Navigator initialRouteName="Journal" screenOptions={{ headerShown: false,
      drawerStyle: {
        backgroundColor: '#1e1e1e', // dark background
        width: 260,
      },
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#aaa',
      drawerLabelStyle: {
        fontSize: 16,
      }, }}>
      <Drawer.Screen
        name="Journal"
        component={JournalScreen}
        initialParams={{ refresh: true }}
      />
      <Drawer.Screen
        name="New Dream"
        component={NewDreamScreen}
      />
      <Drawer.Screen
        name="QuestionsPrompt"
        component={QuestionsPromptScreen}
        initialParams={{ questions: [], text: "" }}
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the drawer
        }}/>
        <Drawer.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        initialParams={{ questions: [], text: "" }}
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the drawer
        }}/>

      <Drawer.Screen
        name="Dream"
        component={DreamScreen}
        initialParams={{ dream: {} }}
        options={{
          drawerItemStyle: { display: 'none' }, // Hide this screen from the drawer
        }}/>
      <Drawer.Screen
        name="Log out"
        component={LoginScreen}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
            handleLogout();
          },}}
      />
    </Drawer.Navigator>
  );
}