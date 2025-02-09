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
      onPress={() => navigation.navigate("PreviousOrders")}
    >
      {/* <Card style={styles.container}>
        <Card.Content>
          <View styles={styles.wrapper}>
            <View style={styles.content}>
              <View>
                <Text style={{ fontFamily: FONTS.regular, fontSize: 20, marginTop: 10 }}>
                  Previous Orders
                </Text>
              </View>

              <View style={styles.sideDiv}>
                <Icon
                  name="cart-outline"
                  color={COLORS.accent}
                  size={50}
                  style={{ marginLeft: 100 }}
                />
              
              </View>
            </View>
          </View>
        </Card.Content>
      </Card> */}
{/* 
      <Card style={styles.container}>
        <Card.Content>
            <View style={styles.navBar}>
              <View style={styles.leftContainer}>
                <Text style={{ fontFamily: FONTS.regular, fontFamily: FONTS.regular, fontSize: 20, marginTop: 10 }}>
                    Previous Orders
                  </Text>
              </View>

              <View style={styles.rightContainer}>
                <Text>As</Text>
              </View>

            </View>
        </Card.Content>
      </Card> */}
    <View>
    <Card style={styles.container}>
      <Card.Content style={[styles.container,{ marginVertical:-20}]}>
        <View style={styles.navBar}>
          <Text style={{ fontFamily: FONTS.regular, fontSize: 20, color: "grey", textAlign: 'left', marginLeft: -25}}>
            Previous Orders
          </Text>
          <View style={styles.rightContainer}>
          <Icon
              name="cart-outline"
              color={COLORS.accent}
              size={50}
              style={{ marginLeft: 100 }}
            /> 
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
