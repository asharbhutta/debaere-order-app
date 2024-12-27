import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
TouchableNativeFeedback;
import {
  selectUserName,
  selectEmail,
  setSignOut,
} from "../redux/slices/authSlice";
import { COLORS } from "./Colors";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderDetailTable from "./OrderDetailTable";
import { reorderCart } from "../redux/slices/cartSlice";
import { showSucessSnackBar } from "../redux/slices/snackBarSlice";

export default function OrdersCard({ item }) {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  const navigation = useNavigation();

  function parseDate(dateObj) {
    var dateObject = new Date(Date.parse(dateObj));
    return dateObject.toDateString();
  }

  function processReorder(products) {
    dispatch(reorderCart(products));
    dispatch(
      showSucessSnackBar({
        message: "Items has been successfully added to cart!",
      })
    );
  }

  const data = [1, 2, 3, 4, 5];

  function renderRow() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "stretch" }}></View>
        <View style={{ flex: 1, alignSelf: "stretch" }}></View>
        <View style={{ flex: 1, alignSelf: "stretch" }}></View>
        <View style={{ flex: 1, alignSelf: "stretch" }}></View>
        <View style={{ flex: 1, alignSelf: "stretch" }}></View>
      </View>
    );
  }

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("PreviousOrders")}
    >
      <Card style={styles.container}>
        <Card.Content>
          <View styles={styles.wrapper}>
            <View style={styles.content}>
              <View style={{ justifyContent: "flex-start" }}>
                <Text style={{ color: "grey" }}>Order No:</Text>
                <Text style={{ color: "grey" }}>Order Date:</Text>
                <Text style={{ color: "grey" }}>Created At:</Text>
              </View>
              <View
                style={{
                  padding: 0,
                  marginLeft: 10,
                  justifyContent: 'space-between',
                  flex: 1
                }}
              >
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  {item.order_no.replace(/(\r\n|\n|\r)/gm, "")}
                </Text>
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  {parseDate(item.order_date)}
                </Text>
                <Text style={{ fontStyle: "italic", color: "grey" }}>
                  {parseDate(item.created_at)}
                </Text>
              </View>
              <View>
                <Button
                  buttonStyle={{backgroundColor: 'transparent', borderColor: COLORS.accent}}
                  titleStyle={{color: COLORS.accent}}
                  type="outline"
                  title="REORDER"
                  onPress={() => processReorder(item.products)}
                />
              </View>
            </View>
          </View>

          <OrderDetailTable item={item} />
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
  },

  tableHeader: {
    color: "grey",
    fontSize: 10,
  },

  container: {
    flexDirection: "column",
    padding: 5,
    margin: 5,
    justifyContent: "center",
    width: "100%",
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 5,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
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
    fontStyle: "normal",
    fontWeight: "400",
    maxWidth: 190,
  },
  productDescription: {
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "300",
    maxWidth: 190,
    fontStyle: "italic",
  },
  serving: {
    fontSize: 10,
    marginTop: 50,
    fontStyle: "normal",
    fontWeight: "400",
  },
  portion: {
    fontSize: 10,
    fontStyle: "normal",
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
