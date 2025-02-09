import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import SubAppBar from "../components/SubAppBar";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../components/Colors";
import {
  showSucessSnackBar,
  showWarningSnackBar,
  showErrorSnackBar,
} from "../redux/slices/snackBarSlice";
import { selectToken } from "../redux/slices/authSlice";
import { setProductFav, selectProducts } from "../redux/slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import {
  addItemInCart,
  removeItemInCart,
  updateItemCount,
  updateItemSliced,
  selectOrderDate,
} from "../redux/slices/cartSlice";

// import { SegmentedControls } from "react-native-radio-buttons";
import axios from "axios";
import { FONTS } from "../components/Fonts";

export default function ProductView({ onClickProduct }) {
  const dispatch = useDispatch();
  const route = useRoute();
  const itemm = route.params.item;
  const order = route.params.order;
  const navigation = useNavigation();
  const initialCount = order != null ? order.count : parseInt(itemm.pack_size);
  const ordetransparentProduct = order != null ? true : false;
  const sliceOption = itemm.sliceOption;
  const initialSliced = order != null ? order.sliceOption : null;
  const radioDisabled = order != null ? true : false;
  var options = [
    {
      label: "Sliced",
      value: "sliced",
    },
    {
      label: "Un Sliced",
      value: "unsliced",
    },
  ];

  const [item, setItem] = useState(itemm);
  const [count, setCount] = useState(initialCount);
  const [sliced, setSliced] = useState(initialSliced);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageLoadingFailed, setImageLoadingFailed] = useState(false);
  const orderDate = useSelector(selectOrderDate);
  const token = useSelector(selectToken);
  const products = useSelector(selectProducts);

  const API_URL="https://debaereor.asharbhutta.com/public/api/mark-favorite";

  const changeFavStatus = async (token, dateObj) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // dispatch(loadingStarted());

    await axios
      .post(API_URL, dateObj, config)
      .then((response) => {
        // dispatch(loadingFinished());
      })
      .catch((error) => {
        // dispatch(loadingFinished());
      });
  };
  function setSelectedOption(selectedOption) {
    setSliced(selectedOption);
  }

  function handleCount(item, count, operation = "+") {
    if (operation == "+") {
      count = count + 1;
      setCount(count);
      if (ordetransparentProduct) {
        const product = {
          id: item.id,
          count: count,
        };

        dispatch(updateItemCount(product));
      }
    } else {
      if (count > item.pack_size) {
        count = count - 1;
        setCount(count);
        if (ordetransparentProduct) {
          const product = {
            id: item.id,
            count: count,
          };
          dispatch(updateItemCount(product));
        }
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
    if (item.sliceOption == true && sliced == null) {
      const message = {
        message: "Please Select All options Before Adding Item",
      };
      dispatch(showErrorSnackBar(message));
    } else {
      const product =
        item.sliceOption == true
          ? {
              id: item.id,
              count: count,
              sliceOption: sliced,
              price:item.price

            }
          : {
              id: item.id,
              count: count,
              price:item.price

            };

      dispatch(addItemInCart(product));
      const message = { message: "Item is added successfully" };
      dispatch(showSucessSnackBar(message));
    }
  };

  const removeItem = (item) => {
    const product = {
      id: item.id,
      count: count,
    };

    //setCount(44);

    const message = { message: "Item removed from cart successfully" };
    dispatch(showWarningSnackBar(message));
    dispatch(removeItemInCart(product));
  };

  function ActionButton(props) {
    if (ordetransparentProduct) {
      return (
      <Button
        buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
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
        buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
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

  function weekList (item) {
    const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return (
        <Text style={{flexDirection: 'row', flexWrap: 'wrap', fontFamily: FONTS.regular, fontSize: 10}}>
          {weekdays.map((day, index) => (
            <Text
              key={day}
              style={[
                styles.day,
                { color: item[day] === 1 ? 'green' : 'red' },
              ]}
            >
              {day.toUpperCase()}
              {index < weekdays.length - 1 && ', '}
            </Text>
          ))}
        </Text>
    );
  }
  function isDayEnabledOfSelectedDate(item) {
    // Create a Date object from the dateString
    const date = new Date(orderDate);
  
    // Get the day of the week as a number (0 = Sunday, 1 = Monday, etc.)
    const dayIndex = date.getDay();
  
    // Map the day index to the corresponding day abbreviation
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayName = dayNames[dayIndex];
  
    // Check if the day is enabled in the days object
    return item[dayName] === 1;
  }
  function markFav(currentProduct) {
    let updatedProducts = products.map((item) =>
      item.id == currentProduct.id
        ? { ...item, favorite: !currentProduct.favorite}
        : item
    );
    setItem({ ...item, favorite: !currentProduct.favorite})
    changeFavStatus(token, {'product_id': currentProduct.id , favorite: !currentProduct.favorite})
    dispatch(setProductFav(updatedProducts));
  }

  return (
    <>
      <SubAppBar title={item.name} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
           <Image style={styles.image}  source={!imageLoadingFailed ? { uri: item.image_url } : require('./../../assets/no-image.png')} onLoad={()=>setIsImageLoaded(false)} onError={()=>setImageLoadingFailed(true)} resizeMode= {!imageLoadingFailed ? 'center' : 'cover'}/> 
           {/* {!isImageLoaded && <ActivityIndicator style={{position: 'absolute', alignSelf: 'center'}}/>} */}
          </View>
           <TouchableOpacity style={{ position: 'absolute', top : 15, right: 15}} onPress={()=>markFav(item)}>
            <Image style={[styles.favIcon]} source={item.favorite ? require('./../../assets/fav.png') : require('./../../assets/unFav.png')}/>
          </TouchableOpacity>
          <View style={styles.availableDays}>
            {weekList(item)}
          </View>
          <View
            style={{
              alignItems: "center",
              borderColor: COLORS.accent,
              borderTopWidth: 1,
              padding: 4,
              marginTop: 10,
              paddingTop: 10,
              flexDirection: "row",
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 4
            }}
          >
            {isDayEnabledOfSelectedDate(item) ? 
              <>
                <View style={styles.counterWrapper}>
                  <Button
                    buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
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
                  <Text style={{ textAlign: "center", margin: 5 , fontFamily: FONTS.regular, fontSize: 20, fontWeight: 400, color: "grey"}}>{count}</Text>
                  <Button
                    buttonStyle={{ paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
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
                <ActionButton item={item} />
              </>
              :
              <>
                <Text style={[styles.price, {color: 'red', fontFamily: FONTS.regular, fontSize: 16,}]}>Not avialable for selected date</Text>
              </>
            }
          </View>
          <View>
            <View
              style={{
                alignItems: "flex-start",
                flexDirection: "row",
                marginLeft: 15,
                borderColor: COLORS.accent,
                display: item.sliceOption == true ? "none" : "none",
              }}
            >
              <Text style={{ marginTop: 8, color: "grey" }}>Sliced</Text>
              <RadioButton
                color={COLORS.primary}
                value="sliced"
                disabled={radioDisabled}
                status={sliced === "sliced" ? "checked" : "unchecked"}
                onPress={() => setSliced("sliced")}
              />

              <Text style={{ marginTop: 8, color: "grey" }}>Un Sliced</Text>
              <RadioButton
                color={COLORS.primary}
                value="unsliced"
                disabled={radioDisabled}
                status={sliced === "unsliced" ? "checked" : "unchecked"}
                onPress={() => setSliced("unsliced")}
              />
            </View>
            <View
              style={{
                padding: 20,
                display: item.sliceOption == true ? "flex" : "none",
              }}
            >
              {/* <SegmentedControls
                disabled={radioDisabled}
                tint={COLORS.primary}
                options={["sliced", "unsliced"]}
                onSelection={setSelectedOption.bind(this)}
                selectedOption={sliced}
              /> */}
            </View>
            <Text style={styles.productDescription}>{item.description}</Text>

            <View style={{ marginLeft: 15, marginTop: 10 }}>
              <View
                style={{
                  margin: 3,
                  borderColor: COLORS.accent,
                }}
              >
                <Text>
                  <Text style={{ fontWeight: "bold", margin: 3, color: "grey" }}>
                    Serving:
                  </Text>
                  {item.weight} g
                </Text>

                <Text>
                  <Text style={{ fontWeight: "bold", margin: 3, color: "grey" }}>
                    Portions:
                  </Text>
                  {item.portions}
                </Text>

                <Text>
                  <Text style={{ fontWeight: "bold", margin: 3, color: "grey" }}>
                    Minimum Order:
                  </Text>
                  {item.pack_size}
                </Text>

                <Text>
                  <Text style={{ fontWeight: "bold", margin: 3, color: "grey" }}>
                    Shelf Life:
                  </Text>
                  {item.shelf}
                </Text>

                <Text>
                  <Text style={{ fontWeight: "bold", margin: 3, color: "grey" }}>
                    Storage:
                  </Text>
                  {item.storage}
                </Text>

                <Text style={styles.price}>
                      {item.price} £
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    padding: 1,
    margin: 13,
  },

  image: {
    height: 300,
    // width: '90%',
    margin: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
   
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderColor: "transparent",
  },
  sideDiv: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  productTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontWeight: "400",
  },
  productDescription: {
    fontSize: 15,
    marginLeft: 15,
    fontFamily: FONTS.regular,
    fontWeight: "300",
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
    backgroundColor: "transparent",
    width: "100%", // add width
  },
  counterWrapper: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: 'center'
  },
  cartIcon: {
    marginLeft: 180,
    width: 70,
  },
  price: {
    marginTop:7,
    fontSize: 20,
    fontFamily: FONTS.regular,
    fontStyle: "bold",
    fontWeight: "600",
    color: "grey"
  },
  availableDays: {
    flexDirection: 'row',
    // height: 40,
    marginTop: 10,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  favIcon: {
    width: 30,
    height: 30,
  },
});
