import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./src/Navigation/BottomNav";
import LoginScreen from "./src/Screens/Auth/Login";
import OrderConfirm from "./src/Screens/Orders/OrderConfirm";
import SingleProduct from "./src/Screens/Products/SingleProduct";
import SearchedProducts from "./src/Screens/Products/SearchedProducts";
import RegisterScreen from "./src/Screens/Auth/Register";
import VerifyOtp from "./src/Screens/Auth/VerifyOtp";
import ForgotPassword from "./src/Screens/Auth/ForgotPassword";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="ForgotPassword"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OtpVerify" component={VerifyOtp} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Bottom" component={BottomNav} />
          <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
          <Stack.Screen name="Single" component={SingleProduct} />
          <Stack.Screen name="Searched" component={SearchedProducts} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
