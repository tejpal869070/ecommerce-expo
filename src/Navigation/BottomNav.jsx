import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  AntDesign,
  FontAwesome,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import HomeScreen from "../Screens/Home/HomeScreen";
import { StyleSheet, View } from "react-native";
import { Colors } from "../color";
import ProfileScreen from "../Screens/User/ProfileScreen";
import CartScreen from "../Screens/Cart/CartScreen";
import CategoryProductSelect from "../Screens/Home/CategoryProductSelect";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { ...styles.tab },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems="center">
              {focused ? (
                <Entypo name="home" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="home" size={24} color={Colors.black} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoryProductSelect}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems="center">
              {focused ? (
                <MaterialIcons name="category" size={24} color="green" />
              ) : (
                <MaterialIcons name="category" size={24} color="black" />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems="center">
              {focused ? (
                <FontAwesome6 name="basket-shopping" size={24} color="black" />
              ) : (
                <FontAwesome name="shopping-basket" size={22} color="black" />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View alignItems="center">
              {focused ? (
                <FontAwesome name="user" size={24} color={Colors.main} />
              ) : (
                <AntDesign name="user" size={24} color={Colors.black} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: Colors.white,
    height: 52,
    borderTopWidth: 2,
    borderTopColor: Colors.skyblue,
  },
});
