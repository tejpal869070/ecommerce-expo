import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CartScreen from "../Screens/Cart/CartScreen";
import CheckOutScreen from "../Screens/Cart/CheckOutScreen";

const Stack = createNativeStackNavigator();

export default function CartNav() {
  return (
    <Stack.Navigator
      initialRouteName="Cart-home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cart-home" component={CartScreen} />
      <Stack.Screen
        name="Checkout"
        component={CheckOutScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
