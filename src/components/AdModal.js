import React from "react";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@react-native-material/core";
import { useEffect } from "react";
import {
  adClose,
  adOpen,
  selectAddStatus,
} from "../redux/slices/snackBarSlice";
import Modal from "react-native-modal";
import { COLORS } from "./Colors";
import { selectPromotion } from "../redux/slices/dataSlice";

import {
  showErrorSnackBar,
  showSucessSnackBar,
} from "../redux/slices/snackBarSlice";
import { selectOrderDate, setOrderDate } from "../redux/slices/cartSlice";
export default function AdModal() {
  const visible = useSelector(selectAddStatus);
  const promotion = useSelector(selectPromotion);
  var imageUrl = "";
  const dispatch = useDispatch();

  useEffect(() => {
    console.warn(promotion);
    if (promotion != null) {
      console.warn(promotion);
      dispatch(adOpen());
      imageUrl = promotion.image;
    }
  }, []);

  function closeModal() {
    dispatch(adClose());
  }

  return (
    <Modal key="a12321as" onRequestClose={() => null} visible={visible}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderRadius: 10,
            width: "80%",
            height: "80%",
            backgroundColor: "white",
            padding: 10,
            alignItems: "center",
            borderBottomColor: COLORS.accent,
            borderBottomWidth: 10,
            borderTopColor: COLORS.accent,
            borderTopWidth: 10,
          }}
        >
          <View
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            {/* me */}
            {/* <Button
              variant="outlined"
              color="#ceb888"
              tintColor="#ceb888"
              onPress={() => closeModal()}
              trailing={(props) => (
                <Icon
                  style={{ textAlign: "center", paddingRight: 10 }}
                  type="ionicon"
                  name="close-outline"
                  size={25}
                  color="red"
                />
              )}
            /> */}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image style={{ borderRadius: 10 }} source={{ uri: imageUrl }} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
