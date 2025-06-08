import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import AuthNavigation from "../navigation/AuthNavigator.js";

export default function Index() {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  }, []);

  return <AuthNavigation />;
}
