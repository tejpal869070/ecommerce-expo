import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProfileScreen from "../Screens/User/ProfileScreen";
import SingleOrderDetail from "../Screens/Orders/SingleOrderDetail";
import UserOrdersList from "../Screens/Orders/UserOrdersList";
import Terms from "../Screens/Home/Terms";

const Stack = createNativeStackNavigator();

export default function ProfileNav() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen
        name="Order-Detail"
        component={SingleOrderDetail}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Orders"
        component={UserOrdersList}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Terms & Conditions"
        component={Terms}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
