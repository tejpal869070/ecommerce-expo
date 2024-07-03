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
import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../color";
import CartScreen from "../Screens/Cart/CartScreen";
import CategoryNav from "./CategoryNav";
import ProfileNav from "./ProfileNav";
import { Box } from "native-base";

const Tab = createBottomTabNavigator();

const { width } = Dimensions.get("window");

export default function BottomNav() {
  return (
    <Box flex={1} bg={Colors.lightGreen} pb={2}>
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
              <View alignItems="center" >
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
          name="Categoriesnav"
          component={CategoryNav}
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
                  <FontAwesome6
                    name="basket-shopping"
                    size={24}
                    color="black"
                  />
                ) : (
                  <FontAwesome name="shopping-basket" size={22} color="black" />
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileNav}
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
    </Box>
  );
}

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: Colors.lightGreen,
    height: 50,
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: Colors.lightWhite,
    width: (width * 97) / 100,
    margin: "auto",
    borderRadius: 30, 
    marginTop: 8,
  },
});
