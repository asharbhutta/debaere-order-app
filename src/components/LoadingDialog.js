import React from "react";
import { Modal, View, Text, ActivityIndicator, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectLoadingStatus } from "../redux/slices/snackBarSlice";
import { COLORS } from "./Colors";

export default function LoadingDialog() {
  const visible = useSelector(selectLoadingStatus);
  return (
    <Modal onRequestClose={() => null} visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#dcdcdc",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{ borderRadius: 10, backgroundColor: "white", padding: 25 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "200" }}>Loading</Text>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      </View>
    </Modal>
  );
}
