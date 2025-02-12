import React from "react";
import {
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { AppBar } from "@react-native-material/core";
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { selectItemsCount, selectOrderDate } from "../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import { Badge, withBadge, withBadgeOptions } from "react-native-elements";
import { COLORS } from "./Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: COLORS.primary,
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 0 : 25;
const CartIcon = ({ tintColor }) => (
  <Icon name="cart" size={30} color={"white"} />
);

function cartBadgeIcon(count) {
  if (count > 0) return withBadge(count)(CartIcon);
  else return CartIcon;
}

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default function SubAppBar({ title, hideCart = "false" }) {
  const itemCount = useSelector(selectItemsCount);
  const navigation = useNavigation();
  const orderDate = useSelector(selectOrderDate);
  const MessagesBadge = cartBadgeIcon(itemCount);
  const handleCartPress = () => {
    if (hideCart == "false") navigation.navigate("Cart");
  };
  var subTitle = null;
  if (title.length > 15) {
    title = title.substring(0, 15) + "...";
  }
  if (hideCart == "true") {
    if (orderDate != null) {
      dateObject = new Date(Date.parse(orderDate));
      var orderDateTitle = dateObject.toDateString();
      subTitle = "Ordering For " + orderDateTitle;
    }
  }

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.navBar} barStyle="light-content" />
      <AppBar
        title={title}
        centerTitle={true}
        subtitle={subTitle}
        style={{ paddingTop: APPBAR_HEIGHT + (Platform.OS == 'android' ? 10 : 0), backgroundColor: COLORS.navBar  }}
        leading={(props) => (
        //   // <IconButton
        //   //   icon={(props) => (
        //   //     <Icon
        //   //       name="arrow-left"
        //   //       {...props}
        //   //       onPress={() => navigation.goBack()}
        //   //     />
        //   //   )}
        //   //   {...props}
        //   // />
          <Button
            buttonStyle={{ backgroundColor: 'transparent'}}
            icon={
              <Icon
                style={{ textAlign: "center", paddingRight: 10  }}
                type="ionicon"
                name="arrow-back-outline"
                size={30}
                color={'white'}
              />
            }
            iconRight
            type="clear"
            onPress={() => navigation.goBack()}
          />
        )}
        trailing={(props) => (
          <View style={{flexDirection:"row"}}>
              <TouchableNativeFeedback onPress={() => handleCartPress()}>
                <View
                  style={{ marginRight: 20 }}
                  onPress={() => console.warn("ddd")}
                >
                  <MessagesBadge style={{ marginRight: 20 }} />
                </View>
              </TouchableNativeFeedback>
          </View>
        )}
      />
    </>
  );
}
