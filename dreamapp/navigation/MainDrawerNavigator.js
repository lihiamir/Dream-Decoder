import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import DreamScreen from "../screens/DreamScreen";
import LoginScreen from "../screens/LoginScreen";
import QuestionsPromptScreen from "../screens/QuestionsPromptScreen";
import QuestionScreen from "../screens/QuestionScreen";
import NewDreamScreen from "../screens/NewDreamScreen";
import JournalScreen from "../screens/JournalScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { auth } from "../config/firebase";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/* Main Drawer Items */}
        <View style={{ flex: 1 }}>
          <DrawerItem
            label="Journal"
            onPress={() => props.navigation.navigate("Journal")}
            labelStyle={styles.drawerLabel}
          />
          <DrawerItem
            label="New Dream"
            onPress={() => props.navigation.navigate("New Dream")}
            labelStyle={styles.drawerLabel}
          />
        </View>

        {/* Bottom Drawer Items */}
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            label="Settings"
            onPress={() => props.navigation.navigate("Settings")}
            labelStyle={styles.drawerLabel}
          />
          <DrawerItem
            label="Log out"
            onPress={handleLogout}
            labelStyle={styles.drawerLabel}
          />
        </View>
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Settings"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#1e1e1e",
          width: 260,
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#aaa",
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Journal" component={JournalScreen} />
      <Drawer.Screen name="New Dream" component={NewDreamScreen} />
      <Drawer.Screen
        name="QuestionsPrompt"
        component={QuestionsPromptScreen}
        options={{
          drawerItemStyle: { display: "none" }, // Hide this screen from the drawer
        }}
      />
      <Drawer.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{
          drawerItemStyle: { display: "none" }, // Hide this screen from the drawer
        }}
      />
      <Drawer.Screen
        name="Dream"
        component={DreamScreen}
        options={{
          drawerItemStyle: { display: "none" }, // Hide this screen from the drawer
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Log out" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 16,
    color: "#fff",
  },
  bottomDrawerSection: {
    borderTopWidth: 1,
    borderTopColor: "#aaa",
    paddingTop: 10,
  },
});