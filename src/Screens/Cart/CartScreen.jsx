import { Box, Button, Center, HStack, ScrollView, Text } from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CartItem2 from "./CartItem2";
import { StatusBar } from "expo-status-bar";
import {
  CartData,
  CheckToken,
  GetCartDataByIds,
} from "../../Controller/User/UserController";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function CartScreen() {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  console.log("screen", productData);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isUser, setIsUser] = useState(false);

  const getCartData = async () => {
    try {
      const response = await GetCartDataByIds();
      console.log("reson", response.data)
      if (response.status) {
        setProductData(response.data);
      } else {
        setProductData([]); 
      }
    } catch (error) {
      setProductData([]);
    }
  };

  const checkZero = () => {
    getCartData();
    checkTotalPrice();
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

  const checkTotalPrice = async () => {
    const arrayOfPrice = [];
    const localCartData = await SecureStore.getItemAsync("cartData");
    if (localCartData) {
      const cartData = JSON.parse(localCartData);
      for (let i = 0; i <= cartData.length - 1; i++) {
        const cartId = cartData[i].id;
        const cartIdData =
          productData && productData.find((item) => item.cart_id === cartId);
        if (cartIdData) {
          const regular_price =
            cartIdData.colorDetails[0].sizeDetails[0].regular_price;
          const qtyInLocal = cartData[i].qty;
          arrayOfPrice.push(regular_price * qtyInLocal);
          setTotalPrice(arrayOfPrice.reduce((acc, num) => acc + num, 0));
        }
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartData();
      CheckUserLogin();
      checkTotalPrice();
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
      {!isUser || (productData && productData.length === 0) ? (
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
          {productData && (
            <CartItem2 isZero={checkZero} productData={productData} />
          )}
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
              <Text bold>Total Amount</Text>
              <Button
                bg={Colors.main}
                _text={{ fontWeight: "bold" }}
                rounded="full"
                px={6}
              >
                <Text color={Colors.white} bold>
                  ₹{totalPrice && totalPrice}
                </Text>
              </Button>
            </HStack>
          </Center>

          {/*Check out button */}
          {/* <CheckOut totalPrice={totalPrice} />*/}
          <Button
            bg={Colors.black}
            mt={4}
            mx={4}
            rounded="full"
            py={4}
            _pressed={{ bg: Colors.black }}
            _text={{ fontWeight: "bold" }}
            onPress={() =>
              navigation.navigate("Checkout", { totalPrice: totalPrice })
            }
          >
            CHECKOUT
          </Button>

          <Box py={6}></Box>
        </ScrollView>
      )}
    </Box>
  );
}
