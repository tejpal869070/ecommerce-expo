import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNav from "./src/Navigation/BottomNav";
import LoginScreen from "./src/Screens/Auth/Login";
import OrderConfirm from "./src/Screens/Orders/OrderConfirm";
import SingleProduct from "./src/Screens/Products/SingleProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="Bottom"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Bottom" component={BottomNav} />
          <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
          <Stack.Screen name="Single" component={SingleProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
