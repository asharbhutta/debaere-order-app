import * as React from "react";
import {
  Text,
  View,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { selectOrderDate } from "../redux/slices/cartSlice";
import { selectProducts } from "../redux/slices/dataSlice";
import { modalOpen } from "../redux/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import { showWarningSnackBar } from "../redux/slices/snackBarSlice";
import { useSelector } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from "./Colors";

export default function CategoryCard({ item }) {
  const orderDate = useSelector(selectOrderDate);
  const products = useSelector(selectProducts);
  const [thumbnail, setThumbnail] = React.useState(item?.image_url ?? null)
  const dispatch = useDispatch();

  React.useEffect(()=>{
    let selectedCategoryProfucts = products?.filter(p=>p.offering_id == item.id)
    if(selectedCategoryProfucts?.length > 0 && item?.show_custom_image != true) {
      const randomIndex = Math.floor(Math.random() * selectedCategoryProfucts.length);
      setThumbnail(selectedCategoryProfucts[0].image_url)
    }
  },[])

  const navigation = useNavigation();
  function handleCategoryPress() {
    if (orderDate == null) {
      dispatch(modalOpen());
      dispatch(showWarningSnackBar({ message: "Please Select Order Date" }));
    } else navigation.navigate("Category", { name: item.name, id: item.id });
  }

  return (
    <TouchableNativeFeedback onPress={() => handleCategoryPress()}>
      <Card style={[styles.container, styles.shadow]}>
        {/* <Card.Content>
          <Image style={styles.image} source={{ uri: item.image_url }} resizeMode="contain"/>
          <Text style={{color: 'black'}}>{item.name}</Text>
        </Card.Content> */}
        <View style={styles.card}>
          <Image style={styles.image2} source={{ uri: thumbnail }} resizeMode="cover"/>
          <Text style={{color: 'white', position: 'absolute', bottom: 10, zIndex: 200, marginHorizontal: 10}}>{item.name}</Text>
          <LinearGradient
            colors={Platform.OS == 'ios' ? ['transparent',  'rgba(32, 17, 66, 1)' ] : ['transparent','rgba(32, 17, 66, 1)' ]}        
            style={styles.gradient}
          />
        </View>
      </Card>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    margin: 5,
    height: 100,
    borderRadius: 10,
     overflow: 'hidden'
  },
  card: {
    borderRadius: 10,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    width: 40,
    height: 40,
  },
  image2: {
    width: '100%',
    height: '100%',
    marginLeft: 0,
    overflow: 'hidden'
  },
  gradient: {
    position: 'absolute',
    // top: height * 0.33 - 50, // Adjust this value to make the blend smoother
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%', //* 0.5 + 50, // Gradient covers the bottom half of the screen
    zIndex: 100
  },
  shadow: {
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowColor: COLORS.navBar,
    shadowOffset: {
      width:2,
      height: 4,
    },
    elevation: 4, 
  },
});
