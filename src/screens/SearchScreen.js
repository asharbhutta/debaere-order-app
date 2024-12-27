import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  FlatList,
} from "react-native";
import SubAppBar from "../components/SubAppBar";
import { useRoute } from "@react-navigation/native";

import { COLORS } from "../components/Colors";
import { Products } from "../data/Products";
import ProductCard from "../components/ProductCard";
import { showSucessSnackBar } from "../redux/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/slices/dataSlice";
import { useNavigation } from "@react-navigation/native";
import { modalOpen } from "../redux/slices/snackBarSlice";
import { selectToken } from "../redux/slices/authSlice";
import { loadData } from "../redux/slices/dataSlice";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import {
  loadingStarted,
  loadingFinished,
  showErrorSnackBar,
} from "../redux/slices/snackBarSlice";
import OrdersCard from "../components/OrderCard";
import { TextInput } from "react-native-paper";



export default function SearchScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const products = useSelector(selectProducts);
  const token = useSelector(selectToken);
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const isOrderEmpty = orders.length > 0 ? false : true;
  const [filteredPorducts,setFilteredProducts]=useState(products);

  function handleSearchChange(note) {
    setSearchTerm(note);
    var fProducts=[];
    fProducts=products.filter(product => {
                if (note === "") return products;
                return product.name.toLowerCase().includes(note.toLowerCase());
            });
      setFilteredProducts(fProducts);
  }

  const onClickProduct = () => {
    const message = { message: "Item is added successfully" };
    dispatch(showSucessSnackBar(message));
  };

  const API_URL="http://debaereorder.asharbhutta.com/public/api/previousOrders";
  //const API_URL="http://192.168.0.107/debaere_order_admin/debaere_order_admin/public/api/previousOrders"

  const getOrders = async (token) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    let response = await axios
      .get(
        API_URL,
        config
      )
      .then((response) => {
        var orders = response.data.orders;
        setOrders(orders);

        dispatch(loadingFinished());
      })
      .catch((error) => {
        dispatch(loadingFinished());
      });

    return response;
  };

  useEffect(() => {
    // getOrders(token);
    // console.log(orders);
  }, []);

  return (
    <>
      <SubAppBar title="Search Products" />
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
         <TextInput
          label="Search Products...."
          mode="outlined"
          placeholder="Search Products...."
          outlineColor={COLORS.accent}
          activeOutlineColor={COLORS.primary}
          maxLength={30}
          onChangeText={(text) => handleSearchChange(text)}
        />
          <Text
            style={{
                color: "grey",
                display:searchTerm=="" ? "none":"flex"
            }}
          >{"Total" + `${filteredPorducts.length}` + "Item(s) Found"}</Text>
       <FlatList
          data={filteredPorducts}
          renderItem={({ item, navigation }) => {
            return <ProductCard  highlight={searchTerm} onClickProduct={onClickProduct} item={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
}
