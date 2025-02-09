import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  Platform,
  ActivityIndicator
} from "react-native";
import { TextInput, IconButton } from "@react-native-material/core";
import CategoryCard from "../components/CategoryCard";
import { adOpen, modalOpen } from "../redux/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/slices/authSlice";
import { loadData } from "../redux/slices/dataSlice";
import axios from "axios";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";;
import {
  loadingStarted,
  loadingFinished,
  selectLoadingStatus,
  selectLoadingDismissedStatus
} from "../redux/slices/snackBarSlice";
import { selectOfferings } from "../redux/slices/dataSlice";
import { selectOrderDate } from "../redux/slices/cartSlice";
import { COLORS } from "../components/Colors";
import Modal from "react-native-modal";
import { selectPromotion } from "../redux/slices/dataSlice";
import RenderHtml from "react-native-render-html";
import { FONTS } from "../components/Fonts";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const categories = useSelector(selectOfferings);
  const orderDate = useSelector(selectOrderDate);
  const promotion = useSelector(selectPromotion);
  const loadingDismissed = useSelector(selectLoadingDismissedStatus);
  const orderedProduct = orderDate != null ? true : false;

  const [AdOpen, setAdOpen] = useState(orderedProduct);
  const [AdPresentedOnce, setAdPresentedOnce] = useState(false);
  const [pOpen, setPOpen] = useState(orderedProduct);
  const [description, setdescription] = useState("");
  const [promotionActive, setPromotionActive] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [adImage, setAdImage] = useState(null);
  // if (orderedProduct == true) {
  //   console.warn("order is open");
  //   // setPOpen(true);
  // }

  const API_URL="https://debaereor.asharbhutta.com/public/api/getData";
 // const API_URL="http://192.168.0.107/debaere_order_admin/debaere_order_admin/public/api/getData";


  var orderButtonTitle = "select Order Date";
  if (orderDate != null) {
    dateObject = new Date(Date.parse(orderDate));
    orderButtonTitle = dateObject.toDateString();

    // if (promotionActive) {
    //   openPromotion();
    // }
  } else {
    // openModal();
  }

  function setAddClose() {
    setAdOpen(false);
  }

  const getData = async (token) => {
    let config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(loadingStarted());

    await axios
      .get(API_URL, config)
      .then((response) => {
        dispatch(loadData(response.data));
        dispatch(loadingFinished());
        if (response.data.promotion.active == 1) {
          // setAdOpen(true);
          setPromotionActive(true);
          setAdImage(response.data.promotion.image);
          setdescription(response.data.promotion.description);
          ///if (orderDate == null) openModal();
        }
      })
      .catch((error) => {
        dispatch(loadingFinished());
        dispatch(showErrorSnackBar({ message: error?.message ?? "No Data" }));
      });
  };

  // Update the document title using the browser API

  useEffect(() => {
    if (categories.length == 0) getData(token);
  }, []);

  useEffect(() => {
    if (!AdPresentedOnce && promotionActive && loadingDismissed) {
      setAdOpen(true)
      setAdPresentedOnce(true)
    }
  },[promotionActive, loadingDismissed, AdPresentedOnce])

  // useEffect(() => {
  //   getData(token);
  // });

  function openModal() {
    dispatch(modalOpen());
  }

  function openPromotion() {
    setAdOpen(true);
  }

  return (
    <View style={{ flex: 1, paddingTop: 20}}>
       <TextInput
        style={{ padding: 15, borderRadius: 40, display: "none" }}
        label="Search"
        variant="outlined"
        color={COLORS.primary}
        tintColor={COLORS.primary}
        onFocus={() => showAlert()}
      />
      <Button
        buttonStyle={{ padding: 10, margin: 10 , backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
        titleStyle={{color: COLORS.accent}}
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
        title={orderButtonTitle.toUpperCase()}
        onPress={() => openModal()}
      />

      <FlatList
        data={categories}
        renderItem={({ item, navigation }) => {
          return <CategoryCard item={item} />;
        }}
        keyExtractor={(item) => item.link}
        numColumns={3}
      />
      <Modal key="a12321as" onRequestClose={() => null} visible={AdOpen}>
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
              width: "90%",

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
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Button
                buttonStyle={{ paddingHorizontal: 20, backgroundColor: 'transparent', borderColor: COLORS.accent, borderWidth: 1}}
                icon={
                  <Icon
                    style={{ textAlign: "center"}}
                    type="ionicon"
                    name="close-outline"
                    size={20}
                    color="red"
                  />
                }
                type="outline"
                onPress={() => setAddClose()}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
              }}
            >
              {adOpen ? (
                <View style={{ width: 300, height: 300,alignContent: 'center', alignItems: 'center', borderRadius: 8, overflow: 'hidden'}}>
                  <Image
                    source={{ uri: adImage }}
                    style={{
                      width: 300,
                      height: 300,
                      resizeMode: "contain",
                    }}
                    onLoad={()=>setIsImageLoaded(true)}
                  />
                  {!isImageLoaded && 
                    <View style={{position: 'absolute',  width: 300, height: 300, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                      <ActivityIndicator color={COLORS.primary} size="large" style={{alignSelf: 'center'}}/>
                    </View>
                  }
                </View>
              ) : (
                <Text>Ashar</Text>
              )}
              <RenderHtml contentWidth="90%" source={{ html: description }}  classesStyles={{
                  custom: { color: 'black', fontFamily: FONTS.regular, fontSize: 18 }, // Change color for a class named "custom"
                }} tagsStyles={{
                  p: { color: 'black' }, // Change all <p> tags to blue
                  h1: { color: 'black', fontFamily: FONTS.regular, fontSize: 24 }, // Customize <h1> tags
                  span: { color: 'black' }, // Customize <span> tags
                }}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
