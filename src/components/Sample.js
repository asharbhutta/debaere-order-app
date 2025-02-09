import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DAppBar from './DAppBar';
// import { useFonts } from 'expo-font';



export default function Sample({navigation}) {

  //  const [loaded] = useFonts({
  //   Montserrat: require('../../assets/fonts/Roboto-Bold.ttf'),
  // });

  if (!loaded) {
    return null;
  }

  return (
        <>
        <View style={styles.container}>
          <Text style={styles.textStyle} >Ashar B</Text>
        </View>
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Roboto-Light'
  },
  textStyle:{
        // fontFamily: 'Montserrat',
        fontWeight:'bold'
        
  }

});
