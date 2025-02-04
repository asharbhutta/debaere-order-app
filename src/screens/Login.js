import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useDispatch } from "react-redux";
import { COLORS } from "../components/Colors";
import { setSignIn } from "../redux/slices/authSlice";
import {
  loadingStarted,
  loadingFinished,
  showErrorSnackBar,
} from "../redux/slices/snackBarSlice";
import axios from "axios";
import { loadData } from "../redux/slices/dataSlice";


import { useEffect } from "react";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showElement, setShowElement] = React.useState(false);
  const LOGIN_URL = "https://debaereor.asharbhutta.com/public/api/login";
  // const LOGIN_URL="http://192.168.0.107/debaere_order_admin/debaere_order_admin/public/api/login"

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(function () {
      setShowElement(true);
    }, 2000);
  }, []);

  const handleLogin = async () => {
    dispatch(loadingStarted());
    await axios
      .post(LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(loadingFinished());
        const user = {
          email: response.data.user.email,
          userName: response.data.customer.name,
          token: response.data.authorisation.token,
        };
        dispatch(setSignIn(user));
        //dispatch(loadData(response.data));
      })
      .catch((error) => {
        console.warn(error);
        dispatch(loadingFinished());
        if (error.response.status == 401) {
          dispatch(showErrorSnackBar({ message: "Wrong Username/Password" }));
        }
      });
  };
    const MyStatusBar = ({ backgroundColor, ...props }) => (
      <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
      </View>
    );

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={styles.containerInner}>

        <MyStatusBar backgroundColor="#ceb888" barStyle="light-content" />
        <Image
          style={styles.image}
          source={require("../../assets/debere_logo.png")}
        />

        <StatusBar style="auto" />
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          {...(Platform.OS === "ios"
            ? {
                behavior: "position",
                // keyboardVerticalOffset: [30], // calculate height using onLayout callback method
              }
            : {})}
        >
          <View
            style={{
              display: showElement == true ? "flex" : "none",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() =>
                //navigation.navigate("Main", { name: "Jane" })
                handleLogin()
              }
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ceb888",
  },
  containerInner: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    marginBottom: 10,
    transform: [{ scale: 0.3 }],
  },

  inputView: {
    backgroundColor: COLORS.accent,
    borderRadius: 40,
    width: "80%",
    height: 65,
    marginBottom: 5,

    alignItems: "center",
  },

  TextInput: {
    height: 100,
    width: '100%',
    flex: 1,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    display: "none",
    color: "grey",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: COLORS.primary,
  },
});
