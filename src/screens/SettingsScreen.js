import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import UserInfo from "../components/UserInfo";
import PreviousOrdersCard from "../components/PreviousOrdersCard";
import FavProductsCard from "../components/FavProductsCard";


export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", height: 20 }}>
      <UserInfo />
      <FavProductsCard />
      <PreviousOrdersCard />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'green'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    backgroundColor: 'white',
  }
});