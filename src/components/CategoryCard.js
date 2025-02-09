import * as React from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { selectOrderDate } from "../redux/slices/cartSlice";
import { modalOpen } from "../redux/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import { showWarningSnackBar } from "../redux/slices/snackBarSlice";
import { useSelector } from "react-redux";
export default function CategoryCard({ item }) {
  const orderDate = useSelector(selectOrderDate);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  function handleCategoryPress() {
    if (orderDate == null) {
      dispatch(modalOpen());
      dispatch(showWarningSnackBar({ message: "Please Select Order Date" }));
    } else navigation.navigate("Category", { name: item.name, id: item.id });
  }

  return (
    <TouchableNativeFeedback onPress={() => handleCategoryPress()}>
      <Card style={styles.container}>
        <Card.Content>
          <Image style={styles.image} source={{ uri: item.image_url }} resizeMode="contain"/>
          <Text style={{color: 'black'}}>{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    margin: 5,
    height: 100
  },

  image: {
    width: 40,
    height: 40,
  },
});
