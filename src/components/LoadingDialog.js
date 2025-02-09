import React from "react";
import { Modal, View, Text, ActivityIndicator, Button, Animated, Easing } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectLoadingStatus, loadingDismissed } from "../redux/slices/snackBarSlice";

import { COLORS } from "./Colors";
import { Image } from "react-native-elements";

export default function LoadingDialog() {
  const dispatch = useDispatch();
  const visible = useSelector(selectLoadingStatus);
  const opacity = React.useRef(new Animated.Value(1)).current;
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const [scaleAnimationComplete, setScaleAnimationComplete] = React.useState(false);
  const [showModal, setShowModal] = React.useState(true);

  React.useEffect(() => {
    // if (visible) {
    //   // setShowModal(true); // Show modal before animation
    //   // Animated.timing(opacity, {
    //   //   toValue: 1, // Fade in
    //   //   duration: 1, // Adjust speed as needed
    //   //   useNativeDriver: true,
    //   // }).start();
    // } else {
    //   Animated.timing(opacity, {
    //     toValue: 0, // Fade out
    //     duration: 50000,
    //     useNativeDriver: true,
    //   }).start(() => setShowModal(false)); // Hide modal after fade-out completes
    // }
    if(!visible && scaleAnimationComplete) {
      setShowModal(false)
      dispatch(loadingDismissed())
    }
  }, [visible, scaleAnimationComplete]);

  React.useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1, // Scale to normal size
      duration: 5000, // Slow speed (2 seconds)
      easing: Easing.inOut(Easing.ease), // Smooth transition
      useNativeDriver: true, // Optimized performance
    }).start(()=>{
      setScaleAnimationComplete(true)
    });
  }, []);
  return (
    <Modal onRequestClose={() => null} visible={showModal} animationType="none" transparent>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          opacity
        }}
      >
        <View
          style={{ borderRadius: 10, backgroundColor: "transparent", padding: 25 }}
        >
          <Animated.Image source={require('./../../assets/debere_logo.png')} resizeMode='contain' style={[{aspectRatio:1, width:150}, { transform: [{ scale: scaleValue }] }]}/>
        </View>
      </Animated.View>
    </Modal>
  );
}

