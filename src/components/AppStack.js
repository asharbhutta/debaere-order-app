import React from "react";
import Dashboard from "../screens/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryView from "../screens/CategoryView";
import CartView from "../screens/CartView";
import ProductView from "../screens/ProductView";
import OrdersScreen from "../screens/OrdersScreen";
import SearchScreen from "../screens/SearchScreen";
import FavProductView from "../screens/FavProductsListView";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
      initialRouteName="Main"
    >
      <Stack.Screen name="Category" component={CategoryView} />
      <Stack.Screen name="Cart" component={CartView} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Product" component={ProductView} />
      <Stack.Screen name="Main" component={Dashboard} />
      <Stack.Screen name="FavProductView" component={FavProductView} />
      <Stack.Screen name="PreviousOrders" component={OrdersScreen} />
    </Stack.Navigator>
  );
}
