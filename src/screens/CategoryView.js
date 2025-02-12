import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
} from "react-native";
import SubAppBar from "../components/SubAppBar";
import { useRoute } from "@react-navigation/native";

import ProductCard from "../components/ProductCard";
import { showSucessSnackBar } from "../redux/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/slices/dataSlice";
import { FONTS } from "../components/Fonts";
import LinearGradient from 'react-native-linear-gradient';

export default function CategoryView() {
  const dispatch = useDispatch();
  const route = useRoute();
  const products = useSelector(selectProducts);
  var filteredPorducts = [];
  products.filter((data) => {
    if (data.offering_id == route.params.id) {
      filteredPorducts.push(data);
    }
  });

  const isProductsEmpty = filteredPorducts.length > 0 ? false : true;

  const onClickProduct = () => {
    const message = { message: "Item is added successfully" };
    dispatch(showSucessSnackBar(message));
  };
  return (
    <>
      <SubAppBar title={route.params.name} />
      <View
        style={{ flex: 1, display: isProductsEmpty == true ? "none" : "flex" }}
      >
        <FlatList
          data={filteredPorducts}
          renderItem={({ item, navigation }) => {
            return <ProductCard onClickProduct={onClickProduct} item={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          flex: 1,
          display: isProductsEmpty == true ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: FONTS.regular, fontSize: 20, fontStyle: "italic", color: "grey" }}>
          No Products Found !
        </Text>
      </View>
    </>
  );
}
