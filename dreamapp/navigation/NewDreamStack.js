import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewDreamScreen from "../screens/NewDreamScreen";
import QuestionsPromptScreen from "../screens/QuestionsPromptScreen";
import DreamScreen from "../screens/DreamScreen";
import QuestionScreen from "../screens/QuestionScreen";

const Stack = createNativeStackNavigator();

export default function NewDreamStack({route}) {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="QuestionsPrompt"
        component={QuestionsPromptScreen}
        initialParams={{ questions: [], text: "" }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        initialParams={{ questions: [], text: "" }}
      />
    </Stack.Navigator>
  );
}