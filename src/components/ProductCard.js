import React, { useState } from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { showErrorSnackBar } from "../redux/slices/snackBarSlice";
import {
  addItemInCart,
  removeItemInCart,
  updateItemCount,
  updateItemSliced,
  updateItemNotes,
  selectOrderDate,
} from "../redux/slices/cartSlice";
// import { SegmentedControls } from "react-native-radio-buttons";
import { COLORS } from "./Colors";
import { TextInput } from "react-native-paper";
import Highlighter from "react-highlight-words";

export default function ProductCard({
  item,
  order = null,
  onClickProduct,
  highlight = "",
}) {
  const navigation = useNavigation();
  const initialCount = order != null ? order.count : parseInt(item.pack_size);
  const initialMessage = order != null ? order.notes : "";
  const orderedProduct = order != null ? true : false;
  const sliceOption = item.sliceOption;
  const initialSliced = order != null ? order.sliceOption : null;
  const notesVisible = item.enable_notes;
  const [count, setCount] = useState(initialCount);
  const [sliced, setSliced] = React.useState(initialSliced);
  const [note, setNote] = React.useState(initialMessage);
  const [price, setPrice] = React.useState(
    parseFloat(item.price * count, 2).toFixed(2)
  );
  const orderDate = useSelector(selectOrderDate);

  function handleNotesChange(note) {
    setNote(note);
    if (orderedProduct) {
      const product = {
        id: item.id,
        notes: note,
      };
      dispatch(updateItemNotes(product));
    }
  }

  function setSelectedOption(selectedOption) {
    setSliced(selectedOption);
    if (orderedProduct) {
      const product = {
        id: item.id,
        sliceOption: selectedOption,
      };
      dispatch(updateItemSliced(product));
    }
  }
  const dispatch = useDispatch();
  function handleCount(item, count, operation = "+") {
    if (item.sliceOption == true && order == null) {
      navigation.navigate("Product", { item: item, order: order });
      return;
    }

    if (operation == "+") {
      count = count + 1;
      setCount(count);
      if (orderedProduct) {
        const product = {
          id: item.id,
          count: count,
          price: item.price,
        };
        dispatch(updateItemCount(product));
      }
      setPrice(parseFloat(item.price * count, 2).toFixed(2));
    } else {
      if (count > item.pack_size) {
        count = count - 1;
        setCount(count);
        if (orderedProduct) {
          const product = {
            id: item.id,
            count: count,
            price: item.price,
          };
          dispatch(updateItemCount(product));
        }
        setPrice(parseFloat(item.price * count, 2).toFixed(2));
      } else {
        dispatch(
          showErrorSnackBar({
            message: "Product Quantity Cannot Be Below Minimum Order Quantity",
          })
        );
      }
    }
  }

  const addItem = (item) => {
    const product = {
      id: item.id,
      count: count,
      notes: note,
      price: item.price,
    };

    if (item.sliceOption == true) {
      navigation.navigate("Product", { item: item, order: order });
    } else {
      var today = new Date();
      var orderDat = new Date(orderDate);
      var hours = Math.abs(orderDat - today) / 36e5;
      hours = Math.round(hours);
      if (orderDate == null) {
        dispatch(
          showErrorSnackBar({
            message:
              "Please Select Order Date First In Order To Add That Item In Cart",
          })
        );

        return 0;
      } else if (item.prior_notice > 0) {
        if (item.prior_notice > hours) {
          dispatch(
            showErrorSnackBar({
              message:
                "This Product need prep time of atleast " +
                item.prior_notice +
                " Hrs.Please select order date accordingly",
            })
          );

          return 0;
        }
      }

      onClickProduct();
      dispatch(addItemInCart(product));
    }
  };

  const removeItem = (item) => {
    const product = {
      id: item.id,
      count: count,
    };

    //setCount(44);

    onClickProduct();
    dispatch(removeItemInCart(product));
  };

  function ActionButton(props) {
    if (orderedProduct) {
      return (
        <Button
          buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent}}
          titleStyle={{color: COLORS.accent}}
          icon={
            <Icon
              style={{ textAlign: "center" }}
              name="trash"
              size={20}
              color="red"
            />
          }
          type="outline"
          onPress={() => removeItem(props.item)}
        />
      );
    } else {
      return (
        <Button
          buttonStyle={{ paddingHorizontal: 15, marginTop: 10, backgroundColor: 'transparent', borderColor: COLORS.accent}}
          titleStyle={{color: COLORS.accent}}
          icon={
            <Icon
              style={{ textAlign: "center" }}
              name="cart"
              size={20}
              color={COLORS.accent}
            />
          }
          type="outline"
          onPress={() => addItem(props.item)}
        />
      );
    }
  }

  return (
    <TouchableNativeFeedback
      style={styles.wrapper}
      onPress={() =>
        navigation.navigate("Product", { item: item, order: order })
      }
    >
      <Card style={styles.container}>
        <Card.Content style={styles.container}>
          <View styles={styles.wrapper}>
            <View style={styles.content}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <View style={styles.sideDiv}>
                <Text style={styles.productTitle}>{item.name}</Text>
                {/* <Highlighter
                  highlightStyle={{ backgroundColor: "yellow" }}
                  searchWords={[highlight]}
                  textToHighlight={`${item.name ?? ""}`}
                  style={styles.productTitle}
                /> */}
                <Text style={styles.productDescription}>
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 5,
                    fontStyle: "normal",
                    fontWeight: "500",
                    maxWidth: 160,
                    fontStyle: "italic",
                    color: "grey",
                    display: item.prior_notice > 0 ? "flex" : "none",
                  }}
                >
                  This Product Requires minimum {item.prior_notice} Hrs Prep
                  Time
                </Text>
                <Text style={styles.serving}>Serving:{item.weight}g</Text>
                <Text style={styles.portion}>Portions:{item.portions}</Text>
                <Text style={styles.portion}>
                  Minimum Order:{item.pack_size}
                </Text>
                <Text style={styles.portion}>Unit Price:{item.price} £</Text>
              </View>
            </View>
            <View style={styles.navBar}>
              <View style={styles.rightContainer}>
                <Text style={styles.price}>{price} £</Text>
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                borderColor: "#ceb888",
                borderTopWidth: 1,
                padding: 4,
                marginTop: 10,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View style={styles.counterWrapper}>
                <Button
                  buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent}}
                  titleStyle={{color: COLORS.accent}}
                  icon={
                    <Icon
                      style={{ textAlign: "center" }}
                      name="remove"
                      size={20}
                      color={COLORS.accent}
                    />
                  }
                  type="outline"
                  onPress={() => handleCount(item, count, "-")}
                />
                <Text style={{ textAlign: "center", margin: 5 , fontSize: 20, fontWeight: 400, color: "grey"}}>{count}</Text>
                <Button
                  buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent}}
                  titleStyle={{color: COLORS.accent}}
                  icon={
                    <Icon
                      style={{ textAlign: "center" }}
                      name="add"
                      size={20}
                      color={COLORS.accent}
                    />
                  }
                  type="outline"
                  onPress={() => handleCount(item, count)}
                />
              </View>
              <ActionButton item={item}/>
            </View>

            {/* <View style={styles.navBar}>
              <View style={styles.rightContainer}>
                <View style={styles.counterWrapper}>
                </View>
              </View>
              <View style={styles.leftContainer}>
                <ActionButton item={item} />
              </View>
            </View> */}

            <View
              style={{
                padding: 10,
                display:
                  item.sliceOption == true && order != null ? "flex" : "none",
              }}
            >
              {/* <SegmentedControls
                tint={COLORS.primary}
                options={["sliced", "unsliced"]}
                onSelection={setSelectedOption.bind(this)}
                selectedOption={sliced}
              /> */}
            </View>

            <View
              style={{
                padding: 10,
                display: notesVisible == 1 ? "flex" : "none",
              }}
            >
              <TextInput
                label="Custom Message On Cake(30)"
                mode="outlined"
                placeholder="Add Custom Message On Cake...(30 characters Only)"
                outlineColor={COLORS.accent}
                activeOutlineColor={COLORS.primary}
                multiline={true}
                numberOfLines={3}
                value={note}
                maxLength={30}
                onChangeText={(text) => handleNotesChange(text)}
              />
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    fontStyle: "normal",
    fontWeight: "400",
    maxWidth: 160,
    color: "grey"
  },
  productDescription: {
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "300",
    maxWidth: 160,
    fontStyle: "italic",
    color: "grey"
  },

  serving: {
    fontSize: 10,
    marginTop: 50,
    fontStyle: "normal",
    fontWeight: "400",
    color: "grey"
  },
  portion: {
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    color: "grey"
  },

  price: {
    marginTop: 7,
    fontSize: 20,
    fontWeight: 500,
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
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    maxWidth: 100,
  },
  cartIcon: {
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
    alignItems: "flex-end",

    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});