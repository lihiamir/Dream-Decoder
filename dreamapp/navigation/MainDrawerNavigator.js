import React from "react";
import { View, StyleSheet } from "react-native";
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
      initialRouteName="Journal"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "rgb(222, 209, 230)",
          width: "50%",
          height: "60%",
          borderBottomEndRadius: 100,
          borderTopRightRadius: 0,
        },
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: {
          fontSize: 16,
          fontStyle: "normal",
        },
      }}
    >
      <Drawer.Screen name="Journal" component={JournalScreen} initialParams={{refresh : true}} />
      <Drawer.Screen name="New Dream" component={NewDreamScreen} />
      <Drawer.Screen
        name="QuestionsPrompt"
        component={QuestionsPromptScreen}
        options={{
          drawerItemStyle: { display: "none" },
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        options={{
          drawerItemStyle: { display: "none" },
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Dream"
        component={DreamScreen}
        options={{
          drawerItemStyle: { display: "none" },
        }}
        initialParams={{ dream: {} }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Log out" component={LoginScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerLabel: {
    fontSize: 18,
    color: "rgb(47, 28, 65)",
    fontWeight: "bold",
  },
  bottomDrawerSection: {
    borderTopWidth: 2,
    borderTopColor: "rgb(89, 65, 111)",
    paddingTop: 10,
  },
});