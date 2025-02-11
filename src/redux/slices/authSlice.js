import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  token: null,
};

const setToken = async (token) => {
  // await AsyncStorage.setItem('token',token);
};

const setAuthObject = async (obj) => {
  const serializedInfo = JSON.stringify(obj);  
  await AsyncStorage.setItem('authObject', serializedInfo);
};

const authSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.token = action.payload.token;

      setAuthObject({
        email: state.email,
        userName: state.userName,
        token: state.token,
      });
    },
    setSignOut: (state) => {
      state.email = null;
      state.userName = null;
      state.isLoggedIn = false;
      state.token = null;

      setAuthObject(null);
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectEmail = (state) => state.userAuth.email;
export const selectUserName = (state) => state.userAuth.userName;
export const selectToken = (state) => state.userAuth.token;

export default authSlice.reducer;
