import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  useEffect(()=>{
    if (__DEV__) {
      NativeDevSettings.setIsDebuggingRemotely(true);
    }
  },[])
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
