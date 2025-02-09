import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { Button } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { FONTS } from "./Fonts";
TouchableNativeFeedback;
import {
  selectUserName,
  selectEmail,
  setSignOut,
} from "../redux/slices/authSlice";
import { COLORS } from "./Colors";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderDetailTable({ item }) {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  const navigation = useNavigation();

  function parseDate(dateObj) {
    var dateObject = new Date(Date.parse(dateObj));
    return dateObject.toDateString();
  }

  const data = [1, 2, 3, 4, 5];

  function renderRow(product, index) {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          flexDirection: "row",
          borderBottomColor: "grey",
          borderBottomWidth: 0.3,
        }}
      >
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>{index}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>{product.name}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>{product.count}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>{product.optionText}</Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flex: 1,
          alignSelf: "stretch",
          flexDirection: "row",
          marginTop: 40,
        }}
      >
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>#</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>Name</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>Qty</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.tableHeader}>Options</Text>
        </View>
      </View>

      <FlatList
        data={item.products}
        renderItem={({ item, navigation, index }) => {
          return renderRow(item, index + 1);
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
  },

  tableHeader: {
    color: "grey",
    fontFamily: FONTS.regular,
    fontSize: 10,
  },

  container: {
    flexDirection: "column",
    padding: 5,
    margin: 5,
    width: "100%",
  },

  image: {
    width: 135,
    height: 135,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  sideDiv: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  productTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontWeight: "400",
    maxWidth: 190,
  },
  productDescription: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    fontWeight: "300",
    maxWidth: 190,
    fontStyle: "italic",
  },
  serving: {
    fontSize: 10,
    marginTop: 50,
    fontFamily: FONTS.regular,
    fontWeight: "400",
  },
  portion: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    fontWeight: "400",
  },
  cartContent: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
    width: "100%", // add width
  },
  counterWrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  cartIcon: {
    marginLeft: 150,
    width: 70,
  },
});
