import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import DAppBar from "../components/DAppBar";
import HomeScreen from "./Home";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function Dashboard(navigation) {
  return (
    <>
      <DAppBar />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "More") {
              iconName = focused ? "menu" : "menu";
            } else if (route.name === "Cart") {
              iconName = focused ? "cart" : "cart-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ceb888",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="More" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}
