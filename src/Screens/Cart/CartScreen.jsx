import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CartItem2 from "./CartItem2";
import { StatusBar } from "expo-status-bar";
import CheckOut from "../Orders/CheckOut";
import { CartData, CheckToken } from "../../Controller/User/UserController";
import { FontAwesome } from "@expo/vector-icons";

export default function CartScreen() {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUser, setIsUser] = useState(false);

  const handleTotalPriceChange = (price) => {
    setTotalPrice(price);
  };

  const getCartData = async () => {
    try {
      const data = await CartData();
      setProductData(data.data);
    } catch (error) {
      console.log("eror", error);
    }
  };

  const checkZero = () => {
    getCartData();
  };

  // check user login
  const CheckUserLogin = async () => {
    const isLoggedIn = await CheckToken();
    if (isLoggedIn) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartData();
      CheckUserLogin();
    }, [])
  );

  return (
    <Box safeAreaTop flex={1} bg="#E5FFE1">
      <StatusBar style="dark" />
      <Center w="full" py={3} borderBottomWidth={0.5}>
        <Text color={Colors.black} fontSize={22} bold>
          Cart
        </Text>
      </Center>
      {/*  <CartEmpty/> */}
      {!isUser || productData.length===0 ? (
        <Center h="70%">
          <Center w={150} h={150} bg={Colors.white} rounded="full">
            <FontAwesome name="shopping-basket" size={64} color={Colors.main} />
          </Center>
          <Text mt={4} bold color={Colors.main}>
            CART IS EMPTY
          </Text>
        </Center>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} mt={1}>
          <CartItem2
            isZero={checkZero}
            onTotalPriceChange={handleTotalPriceChange}
          />
          <Center mt={5}>
            <HStack
              bg={Colors.white}
              h={12}
              alignItems="center"
              rounded="full"
              pl={3}
              w="90%"
              justifyContent="space-between"
            >
              <Text bold>Total Bill</Text>
              <Button
                bg={Colors.main}
                _text={{ fontWeight: "bold" }}
                rounded="full"
                px={6}
              >
                <Text color={Colors.white} bold>
                  ₹{totalPrice}
                </Text>
              </Button>
            </HStack>
          </Center>

          {/*Check out button */}
          <CheckOut totalPrice={totalPrice} />

          <Box py={6}></Box>
        </ScrollView>
      )}
    </Box>
  );
}
