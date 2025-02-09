import React, { useState } from "react";
import { StyleSheet, View, Image, StatusBar } from "react-native";
import { useDispatch } from "react-redux";
import { COLORS } from "../components/Colors";
import { useEffect } from "react";

export default function Splash({ navigation }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("Login", {});
  //   }, 1500);
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={require("../../assets/debere_logo_white.png")}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.input,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 10,
    // transform: [{ scale: 0.3 }],
    width: '60%',
    // height: 100,
  },

  inputView: {
    backgroundColor: COLORS.accent,
    borderRadius: 40,
    width: "80%",
    height: 65,
    marginBottom: 10,

    alignItems: "center",
  },

  TextInput: {
    height: 70,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    display: "none",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.navBar,
  },
});
