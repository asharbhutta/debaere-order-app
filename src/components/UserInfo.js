import * as React from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity} from "react-native";
import { Card } from "react-native-paper";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../components/Colors";
import {
  selectUserName,
  selectEmail,
  setSignOut,
} from "../redux/slices/authSlice";

export default function UserInfo() {
  const dispatch = useDispatch();
  const email = useSelector(selectEmail);
  const userName = useSelector(selectUserName);

  function logoutConfirmationAlert() {
    Alert.alert(
      "Confirm Logging Out ?",
      "Are You sure You want to logout?", // <- this part is optional, you can pass an empty string
      [
        { text: "OK", onPress: () => dispatch(setSignOut()) },
        {
          text: "Cancel",
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Card style={styles.container}>
      <Card.Content style={[styles.container,{ margin:0}]}>
      <View style={styles.navBar}>
          <View style={styles.rightContainer}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {userName}
              </Text>
              <Text style={{ fontStyle: "italic", color: "grey" }}>{email}</Text>
          </View>
            <View style={styles.leftContainer}>
              <Button
                buttonStyle={{ paddingHorizontal: 10, backgroundColor: 'transparent', borderColor: COLORS.accent}}
                titleStyle={{color: 'red', fontSize: 14, fontWeight:400}}
                type="outline"
                title={'LOGOUT'}
                onPress={() => logoutConfirmationAlert()}
              />
            </View>
      </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
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
    borderColor: "red",
    maxWidth: 200,
  },
  sideDiv: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
  },
  productTitle: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "400",
    maxWidth: 180,
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


  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:5
    
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-end',

    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
