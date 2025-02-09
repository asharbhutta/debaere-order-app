import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
} from "react-native";
import SubAppBar from "../components/SubAppBar";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/slices/dataSlice";
import { useNavigation } from "@react-navigation/native";
import { selectToken } from "../redux/slices/authSlice";
import axios from "axios";
import {
  loadingStarted,
  loadingFinished,
} from "../redux/slices/snackBarSlice";
import { selectOfferings } from "../redux/slices/dataSlice";
import { selectOrderDate } from "../redux/slices/cartSlice";
import OrdersCard from "../components/OrderCard";
import { FONTS } from "../components/Fonts";

export default function OrdersScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const products = useSelector(selectProducts);
  const token = useSelector(selectToken);
  const categories = useSelector(selectOfferings);
  const orderDate = useSelector(selectOrderDate);
  const navigation = useNavigation();
  var filteredPorducts = [];
  const [orders, setOrders] = useState([]);
  const isOrderEmpty = orders.length > 0 ? false : true;

  const API_URL="https://debaereor.asharbhutta.com/public/api/previousOrders";
  // const API_URL="http://192.168.0.107/debaere_order_admin/debaere_order_admin/public/api/previousOrders"

  const getOrders = async (token) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    await axios
      .get(API_URL, config)
      .then((response) => {
        console.log('getOrders::', response)
        var orders = response.data.orders;
        setOrders(orders);
        dispatch(loadingFinished());
      })
      .catch((error) => {
        console.log('getOrders::', error)
        dispatch(loadingFinished());
        dispatch(showErrorSnackBar({ message: error?.message ?? "No Data" }));
      });
  };



  // const getOrders = async (token) => {
  //   let config = {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   dispatch(loadingStarted());

  //   let response = await axios
  //     .get(
  //       API_URL,
  //       config
  //     )
  //     .then((response) => {
  //       console.log('getOrders:::', response)
  //       var orders = response.data.orders;
  //       setOrders(orders);

  //       dispatch(loadingFinished());
  //     })
  //     .catch((error) => {
  //       console.log('getOrders:::', error)
  //       dispatch(loadingFinished());
  //     });

  //   return response;
  // };

  useEffect(() => {
    setTimeout(() => {
      getOrders(token);
      console.log(orders);
    }, 100);
  }, []);

  return (
    <>
      <SubAppBar title="Previous Orders" />
      <View
        style={{
          flex: 1,
          padding: 10,
          display: isOrderEmpty == true ? "none" : "flex",
        }}
      >
        <FlatList
          data={orders}
          renderItem={({ item, navigation }) => {
            return <OrdersCard item={item} />;
          }}
          keyExtractor={(item) => item.order_no}
        />
      </View>
      <View
        style={{
          flex: 1,
          display: isOrderEmpty == true ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.regular, fontSize: 20, fontStyle: "italic", color: "grey" }}>
          No Previous Orders Yet !
        </Text>
      </View>
    </>
  );
}
