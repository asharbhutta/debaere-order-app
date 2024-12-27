import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import {
  selectSnackColor,
  selectSnackVisible,
  selectSnackMessage,
} from "../redux/slices/snackBarSlice";
import { hideSnackBar } from "../redux/slices/snackBarSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DSnackBar() {
  const visible = useSelector(selectSnackVisible);
  const color = useSelector(selectSnackColor);
  const message = useSelector(selectSnackMessage);
  const dispatch = useDispatch();
  const hide = () => {
    dispatch(hideSnackBar());
  };

  return (
    <Snackbar
      style={{ backgroundColor: color }}
      visible={visible}
      duration={3500}
      onDismiss={hide}
    >
      <Text>{message}</Text>
    </Snackbar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
