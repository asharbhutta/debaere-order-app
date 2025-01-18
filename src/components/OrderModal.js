import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectModalStatus } from "../redux/slices/snackBarSlice";
import { Button} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { modalClose } from "../redux/slices/snackBarSlice";
import Modal from "react-native-modal";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { COLORS } from "./Colors";
import { selectToken, selectUserName } from "../redux/slices/authSlice";
import { setMinOrderPrice } from "../redux/slices/dataSlice";
import { loadingFinished, loadingStarted } from "../redux/slices/snackBarSlice";
import axios from "axios";

import {
  showErrorSnackBar,
  showSucessSnackBar,
} from "../redux/slices/snackBarSlice";
import { selectOrderDate, setOrderDate } from "../redux/slices/cartSlice";
export default function OrderModal() {
  const visible = useSelector(selectModalStatus);
  const [date, setDate] = useState(null);
  const [varifiedDate, setVerifiedDate] = useState(null);
  const [showVerifyLoading, setShowVerifyLoadinge] = useState(false);
  const dispatch = useDispatch();
  const API_URL =
    "https://debaereor.asharbhutta.com/public/api/getMinOrderPrice";

  const API_URL2 =
    "https://debaereor.asharbhutta.com/public/api/validate-order-date";

  const token = useSelector(selectToken);

  const getMinOrderPrice = async (token, dateObj) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    try {
      await axios
        .post(API_URL, dateObj, config)
        .then((response) => {
          console.log(response.data.min_order_price);
          dispatch(setMinOrderPrice(response.data.min_order_price));
          dispatch(loadingFinished());
        })
        .catch((error) => {
          console.log(error);
          dispatch(loadingFinished());
          dispatch(showErrorSnackBar({ message: error?.message ?? "Error While processing Order.Please check your network connection" }));
        });
    } catch (e) {
      console.warn(e);
    }
  };

  const verifySelected = async (token, selectedDate) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // dispatch(loadingStarted());
    setShowVerifyLoadinge(true)

    try {
      await axios
        .post(API_URL2, selectedDate, config)
        .then((response) => {
          console.log(response);
          setVerifiedDate(selectedDate.order_date)
          // dispatch(
          //   showSucessSnackBar({
          //     message: response?.message ?? "Order Date is Valid",
          //   })
          // );
          // dispatch(loadingFinished());
          setShowVerifyLoadinge(false)
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            showErrorSnackBar({
              message: error?.message ?? "Invalid Date",
            })
          );
          // dispatch(loadingFinished());
          setShowVerifyLoadinge(false)
        });
    } catch (e) {
      console.warn(e);
    }
  };

  function getNext31Days() {
    var datesArr = [];
    var today = new Date();

    for (var i = 1; i <= 31; i++) {
      var nextDate = new Date(new Date().setDate(today.getDate() + i));
      //datesArr.push(nextDate.toDateString());
      datesArr.push(nextDate.toDateString());
    }

    return datesArr;
  }

  function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  const dates = getNext31Days();
  function handleDateChange(date) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    validate = true;
    var today = new Date();
    var orderDate = new Date(date);
    let todayDay = weekday[today.getDay()];
    let orderDay = weekday[orderDate.getDay()];

    var nextDate = new Date(new Date().setDate(today.getDate() + 1));
    nextDate = formatDate(nextDate);
    if (nextDate == date) {
      if (today.getHours() > 11) {
        validate = false;
        setDate(null);
        setVerifiedDate(null);
        const message = {
          message:
            "Sorry! You have missed the order deadline. Please change date for the next day",
        };
        dispatch(showErrorSnackBar(message));
      }
    }

    if (
      todayDay === "Saturday" &&
      (orderDay === "Monday" || orderDay === "Sunday")
    ) {
      if (datediff(today, orderDate) < 5) {
        validate = false;
        setDate(null);
        setVerifiedDate(null);
        const message = {
          message:
            "Placing Order For Sunday & Monday Is Not Allowed on Satuday",
        };
        dispatch(showErrorSnackBar(message));
      }
    }

    if (todayDay === "Sunday" && orderDay === "Monday") {
      if (datediff(today, orderDate) < 5) {
        validate = false;
        setDate(null);
        setVerifiedDate(null);
        const message = {
          message: "Placing Order For  Monday Is Not Allowed on  Sunday",
        };
        dispatch(showErrorSnackBar(message));
      }
    }

    if (
      todayDay == "Friday" &&
      (orderDay === "Monday" || orderDay === "Sunday")
    ) {
      if (datediff(today, orderDate) < 5) {
        if (today.getHours() > 11) {
          validate = false;
          setDate(null);
          setVerifiedDate(null);
          const message = {
            message:
              "Placing Order For Upcoming Saturday,Sunday & Monday Is Not Allowed on Friday After 12pm",
          };
          dispatch(showErrorSnackBar(message));
        }
      }
    }

    if (validate == true) {
      setDate(date);
      verifySelected(token, { order_date: date });
    }
  }

  function proceedOrderDate() {
    var dateObj = { orderDate: date };
    getMinOrderPrice(token, { date: date });

    dispatch(setOrderDate(dateObj));
    dispatch(
      showSucessSnackBar({ message: "Order Date Selected Successfully" })
    );
    closeModal();
  }

  function closeModal() {
    dispatch(modalClose());
  }
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <Modal onRequestClose={() => null} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            borderRadius: 10,
            height: 300,
            marginTop: 100,
            width: "80%",
            backgroundColor: "white",
            padding: 10,
            alignItems: "center",
            borderBottomColor: COLORS.accent,
            borderBottomWidth: 30,
            borderTopColor: COLORS.accent,
            borderTopWidth: 30,
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginLeft: 180,
            }}
          >
          <Button
            buttonStyle={{
              paddingHorizontal: 15, backgroundColor: 'transparent', borderColor: COLORS.accent,
            }}
            icon={
              <Icon
                  style={{ textAlign: "center"}}
                  name="close-outline"
                  size={25}
                  color="red"
                />
            }
            iconRight
            type="outline"
            onPress={() => closeModal()}
          />
          </View>

          <KeyboardAvoidingView
            style={{ width: "100%" }}
            {...(Platform.OS === "ios"
              ? {
                  behavior: "position",
                  keyboardVerticalOffset: [70], // calculate height using onLayout callback method
                }
              : {})}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{color: "grey"}}>Order Date</Text>
              <SelectDropdown
                data={dates.map(title => ({ title }))}
                onSelect={(selectedItem, index) => {
                  handleDateChange(formatDate(dates[index]));
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={{
                      width: 200,
                      height: 50,
                      backgroundColor: '#E9ECEF',
                      borderRadius: 12,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12,
                    }}>
                      <Text style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#151E26',
                        textAlign: 'center'
                      }}>
                        {(selectedItem && selectedItem.title) || "Select Date"}
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View style={{width: '100%',
                          flexDirection: 'row',
                          paddingHorizontal: 12,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingVertical: 8, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                      <Text style={{color: "grey"}}>{item.title}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{
                  backgroundColor: '#E9ECEF',
                  borderRadius: 8,
                }}
              />
            </View>
          </KeyboardAvoidingView>
          <Button
            buttonStyle={{ paddingHorizontal: 10, margin: 10 , backgroundColor: 'transparent', borderColor: COLORS.accent, display: varifiedDate == null ? "none" : "flex",}}
            titleStyle={{color: COLORS.accent,fontWeight: 500}}
            icon={
              <Icon
                style={{ textAlign: "center", paddingRight: 10  }}
                name="cart"
                size={35}
                color={COLORS.accent}
              />
            }
            iconRight
            type="outline"
            title="START ORDER"
            onPress={() => proceedOrderDate()}
          />
          {showVerifyLoading && <ActivityIndicator style={{marginTop: 30}}/>}
        </View>
      </View>
    </Modal>
  );
}
