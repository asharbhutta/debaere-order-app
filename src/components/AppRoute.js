import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { selectIsLoggedIn } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSignIn } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { COLORS } from "./Colors";

const AppRoute = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
 
  const getAuthObject = async () => {
    return await AsyncStorage.getItem('authObject');
    // AsyncStorage.getItem('authObject').then((value) => {
    //   if (value) {
    //     let user_info = JSON.parse(value);
    //     if(user_info) {
    //       return  user_info
    //     }
    //   } else {
    //    return null
    //   }
    // })
  };

  useEffect(() => {
    getAuthObject().then((object) => {
      setIsLoaded(true);
      if (isLoggedIn == false) dispatch(setSignIn(JSON.parse(object)));
    });
  }, []);

  return (
    <NavigationContainer>
      {isLoaded ? (
        isLoggedIn ? (
          <AppStack />
        ) : (
          <AuthStack />
        )
      ) : (
        <ActivityIndicator color={COLORS.primary} size="large" />
      )}
    </NavigationContainer>
  );
};

export default AppRoute;
