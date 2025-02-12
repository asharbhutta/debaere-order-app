import React from "react";
import {
  Platform,
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { AppBar } from "@react-native-material/core";
const STATUS_BAR_HEIGHT = Platform.select({ ios: 40, android: 30 });
import { useSelector } from "react-redux";
import { selectItemsCount } from "../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableNativeFeedback } from "react-native";
import {
  withBadge,
} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "./Colors";


const CartIcon = ({ tintColor }) => (
  <Icon name="cart" size={30} color={"white"} />
);
function cartBadgeIcon(count) {
  if (count > 0) return withBadge(count)(CartIcon);
  else return CartIcon;
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 0 : 0;

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);


const DAppBar = () => {
  const itemCount = useSelector(selectItemsCount);
  const MessagesBadge = cartBadgeIcon(itemCount);
  const navigation = useNavigation();
 

  return (
    <>
      <MyStatusBar backgroundColor={COLORS.navBar} barStyle="light-content"/>
      <AppBar
        title="Debaere Order"
        centerTitle={true}
        style={{ marginTop: APPBAR_HEIGHT, backgroundColor: COLORS.navBar, zIndex: 10000 }}
        leading={(props) => (
          <TouchableNativeFeedback onPress={() => navigation.navigate("Search")}>
          <View
            style={{ marginLeft: 10 }}
            onPress={() => console.warn("ddd")}
          >
              <Icon type="ionicon" name="search" size={30} color={"white"} />
          </View>
        </TouchableNativeFeedback>
        )}
        trailing={(props) => (
          <TouchableNativeFeedback onPress={() => navigation.navigate("Cart")}>
            <View
              style={{ marginRight: 20 }}
              onPress={() => console.warn("ddd")}
            >
              <MessagesBadge style={{ marginRight: 20 }} />
            </View>
          </TouchableNativeFeedback>
        )}
      />
    </>
  );
};

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

export default DAppBar;
