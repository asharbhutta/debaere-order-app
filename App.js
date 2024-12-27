import React from "react";
import { StyleSheet, View , Text} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppRoute from "./src/components/AppRoute";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import DSnackBar from "./src/components/DSnackBar";
import LoadingDialog from "./src/components/LoadingDialog";
import OrderModal from "./src/components/OrderModal";
import { ThemeProvider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const theme = {
  Button: {
    buttonStyle: {
      backgroundColor: 'blue',
      borderRadius: 5,
    },
    titleStyle: {
      fontWeight: 'bold',
    },
  },
};

function App() {
    // NativeDevSettings.setIsDebuggingRemotely(true);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AppRoute/>
            <DSnackBar />
            <LoadingDialog />
            <OrderModal />
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    );
  }
  
  export default App;