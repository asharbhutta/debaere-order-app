import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import SubAppBar from "../components/SubAppBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";
import { showSucessSnackBar } from "../redux/slices/snackBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, selectOrderDate } from "../redux/slices/cartSlice";
import { showWarningSnackBar } from "../redux/slices/snackBarSlice";
import { selectToken, selectUserName } from "../redux/slices/authSlice";
import { selectProducts } from "../redux/slices/dataSlice";
import { loadingFinished, loadingStarted } from "../redux/slices/snackBarSlice";
import { showErrorSnackBar } from "../redux/slices/snackBarSlice";
import axios from "axios";
import { emptyCart, selectTotalPrice } from "../redux/slices/cartSlice";
import { modalOpen } from "../redux/slices/snackBarSlice";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import {
  selectMinOrderPrice,
  selectDeliveryCharges,
} from "../redux/slices/dataSlice";
import { FONTS } from "../components/Fonts";

import { COLORS } from "../components/Colors";
export default function CartView() {
  const dispatch = useDispatch();
  const route = useRoute();
  const cartItemsIds = [];
  const cartItems = useSelector(selectCart);
  const itemOrders = [];
  const filteredProducts = [];
  const products = useSelector(selectProducts);
  const orderDate = useSelector(selectOrderDate);
  const token = useSelector(selectToken);
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const tPrice = useSelector(selectTotalPrice);
  const minOrderPrice = useSelector(selectMinOrderPrice);
  const delivery_charges = useSelector(selectDeliveryCharges);
  console.warn(minOrderPrice);

  const API_URL = "https://debaereor.asharbhutta.com/public/api/makeOrder";
  const API_URL2 =
    "https://debaereor.asharbhutta.com/public/api/validate-order-date";
  //const API_URL="http://192.168.0.107/debaere_order_admin/debaere_order_admin/public/api/makeOrder";

  function makeOrderObject() {
    var orderObjects = [];
    cartItems.forEach((element) => {
      var sliced = 0;
      if (element.hasOwnProperty("sliceOption")) {
        if (element.sliceOption == "sliced") sliced = 1;
      }
      orderObjects.push({
        product_id: element.id,
        count: element.count,
        sliced: sliced,
        notes: element.notes,
      });

      orderObj = { order_date: orderDate, order_products: orderObjects };
    });

    return orderObj;
  }

  const verifySelected = async (token, selectedDate) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    try {
      await axios
        .post(API_URL2, selectedDate, config)
        .then((response) => {
          console.log(response);
          // dispatch(
          //   showSucessSnackBar({
          //     message: response?.message ?? "Order Date is Valid",
          //   })
          // );
          dispatch(loadingFinished());
          postOrder(token, makeOrderObject())
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            showErrorSnackBar({
              message: error?.message ?? "Invalid Date",
            })
          );
          dispatch(loadingFinished());
        });
    } catch (e) {
      console.warn(e);
    }
  };

  const postOrder = async (token, orderObj) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    try {
      await axios
        .post(API_URL, orderObj, config)
        .then((response) => {
          dispatch(
            showSucessSnackBar({
              message: "Order has been placed successfully",
            })
          );
          dispatch(emptyCart());
          dispatch(loadingFinished());
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.warn(error);
          dispatch(showErrorSnackBar({ message: error?.message ?? "Error While processing Order.Please check your network connection" }));
          dispatch(loadingFinished());
        });
    } catch (e) {
      console.warn(e);
    }
  };

  cartItems.forEach((element) => {
    cartItemsIds.push(element.id);
    if (element.sliceOption != null)
      itemOrders.push({
        id: element.id,
        count: element.count,
        sliceOption: element.sliceOption,
        notes: element.notes,
      });
    else
      itemOrders.push({
        id: element.id,
        count: element.count,
        notes: element.notes,
      });
  });
  products.forEach((element) => {
    if (cartItemsIds.indexOf(element.id) > -1) {
      filteredProducts.push(element);
    }
  });

  function getItemOrder(itemId) {
    var selectedOrder = null;
    itemOrders.filter((data) => {
      if (data.id == itemId) {
        selectedOrder = data;
      }
    });

    return selectedOrder;
  }

  const isCartEmpty = filteredProducts.length > 0 ? false : true;

  function showOrderConfirmationAlert() {
    if (orderDate == null) {
      dispatch(modalOpen());
      dispatch(showWarningSnackBar({ message: "Please Select Order Date" }));
      return;
    }

    if (tPrice < minOrderPrice) {
      //deliveryChargesAlert()
      dispatch(
        showErrorSnackBar({
          message:
            "Your order value is less then Daily Minimum Order. Please add more items",
        })
      );
    } else postOrderAlert();
  }

  function postOrderAlert() {
    Alert.alert(
      "Confirm Order",
      "Do you want to proceed with this order ?", // <- this part is optional, you can pass an empty string
      [
        { text: "OK", onPress: () => verifySelected(token, { order_date: orderDate }) },
        {
          text: "Cancel",
        },
      ],
      { cancelable: true }
    );
  }

  function deliveryChargesAlert() {
    Alert.alert(
      "Confirm Delivery Charges",
      "Your total order amount is less than minimum order price.A delivery charge of " +
        delivery_charges +
        "£ will be charged additionally.Do You Confirm? ", // <- this part is optional, you can pass an empty string
      [
        { text: "OK", onPress: () => postOrderAlert() },
        {
          text: "Cancel",
        },
      ],
      { cancelable: true }
    );
  }

  const onClickProduct = () => {
    const message = { message: "Item removed from cart" };
    dispatch(showWarningSnackBar(message));
  };
  return (
    <>
      <SubAppBar title="Cart" hideCart="true" />
      <View style={{ flex: 1, display: isCartEmpty == true ? "none" : "flex" }}>
        <FlatList
          data={filteredProducts}
          renderItem={({ item, index }) => {
            return (
              <ProductCard
                onClickProduct={onClickProduct}
                item={item}
                order={getItemOrder(item.id)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />

        <View
          style={{
            alignItems: "center",
            borderColor: COLORS.primary,
            borderTopWidth: 1,
            padding: 4,
            marginTop: 10,
            flexDirection: "row",
          }}
        />

        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Text style={styles.minOrderLimit}>
              Min Order Limit:{minOrderPrice > 0 ? minOrderPrice : "0"} £
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.price}>Total:{tPrice} £</Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            borderColor: COLORS.primary,
            borderTopWidth: 1,
            padding: 4,
            marginTop: 10,
            flexDirection: "row",
          }}
        />

        <View style={{ alignItems: "center", margin: 5 }}>
          <Button
            buttonStyle={{ padding: 10, marginBottom: 40, width: 200 , backgroundColor:  COLORS.accent, borderWidth: 0}}
            titleStyle={{color: 'white'}}
            icon={
                <Icon
                  style={{ textAlign: "center", paddingRight: 10  }}
                  name="cart"
                  size={25}
                  color={'white'}
                />
              }
              iconLeft
            type="solid"
            title="PROCEED ORDER"
            onPress={() => showOrderConfirmationAlert()}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          display: isCartEmpty == true ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontStyle: "italic" , color: "grey"}}>
          Cart is Empty !
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 1,
    margin: 13,
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
    borderColor: "red",
  },
  sideDiv: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  productTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontWeight: "400",
    maxWidth: 160,
  },
  productDescription: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    fontWeight: "300",
    maxWidth: 160,
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

  price: {
    margin: 5,
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontWeight: "600",
    color: "grey"
  },

  minOrderLimit: {
    margin: 5,
    fontSize: 17,
    fontFamily: FONTS.regular,
    fontWeight: "600",
    color: "grey"
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
    maxWidth: 100,
  },
  cartIcon: {
    marginLeft: 135,
    width: 70,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  leftContainer: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
