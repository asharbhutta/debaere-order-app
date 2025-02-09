import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
TouchableNativeFeedback;
import {
  selectUserName,
  selectEmail,
  setSignOut,
} from "../redux/slices/authSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "./Colors";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "./Fonts";

export default function PreviousOrdersCard() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("FavProductView")}
    >
    <View>
    <Card style={styles.container}>
      <Card.Content style={[styles.container,{ marginVertical:-20}]}>
        <View style={styles.navBar}>
          <Text style={{ fontFamily: FONTS.regular, fontSize: 20, color: "grey", textAlign: 'left', marginLeft: -25}}>
            Favorite Products
          </Text>
          <View style={styles.rightContainer}>
          {/* <Icon
              name="cart-outline"
              color={COLORS.accent}
              size={50}
              style={{ marginLeft: 100 }}
            />  */}
            <Image style={{width: 40, height: 40, marginVertical: 5}} resizeMode='contain' source={require('./../../assets/fav.png')}/>
          </View>
        </View>
      </Card.Content>
    </Card>
    </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    margin:10
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

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:20
  },
  leftContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
