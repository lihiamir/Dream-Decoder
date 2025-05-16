import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewDreamScreen from "../screens/NewDreamScreen";
import QuestionsPromptScreen from "../screens/QuestionsPromptScreen";
import DreamScreen from "../screens/DreamScreen";
import QuestionScreen from "../screens/QuestionScreen";

const Stack = createNativeStackNavigator();

export default function NewDreamStack({route}) {
  const { user } = route.params;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="QuestionsPrompt"
        component={QuestionsPromptScreen}
        initialParams={{ user: user, questions: [], text: "" }}
      />
      <Stack.Screen
        name="QuestionScreen"
        component={QuestionScreen}
        initialParams={{ user: user, questions: [], text: "" }}
      />
    </Stack.Navigator>
  );
}