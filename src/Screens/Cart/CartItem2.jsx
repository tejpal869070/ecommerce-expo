import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Colors } from "../../color";
import InputSpinner from "react-native-input-spinner";
import { MaterialIcons } from "@expo/vector-icons";
import { api } from "../../Config/api";
import { CartData, CartRemove } from "../../Controller/User/UserController";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function CartItem2({ isZero, onTotalPriceChange }) {
  const [cartData, setCartData] = useState([]);

  {/* console.log("cartData",cartData);

  const getCartDataFromLocal = async () => {
    const cartItems = await SecureStore.getItemAsync("cartItems");
    if (cartItems) {
      setCartData(JSON.parse(cartItems));
      console.log("from local")
    } else {
      try {
        const response = await CartData();
        if (data.data.length === 0) {
          isZero();
          return;
        }
        setCartData(response.data); 
        const ids = response.data.map((item)=>item.cart_id)
        await SecureStore.setItemAsync("cartItems", ids);
      } catch (error) {
        isZero();
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartDataFromLocal();
    }, [])
  ); */}

  return (
    <Box px={3}>
      {/*  {productData &&
        productData.map((i, index) => (
          <HStack
            w="full"
            key={index}
            bg={Colors.white}
            rounded={10}
            p={2}
            shadow={2}
            mb={2}
          >
            <Box w="25%">
              <Image
                source={{
                  uri: `${api.API_URL}assets/img/${i.colorDetails[0].image_url[0][0].url}`,
                }}
                w={20}
                h={20}
                resizeMode="contain"
                rounded={8}
                alt="cart"
              />
            </Box>
            <VStack w="73%" px={2}>
              <Text fontSize={16} isTruncated>
                {i.name}
              </Text>
              <Text fontSize="12px" mb={2} color={Colors.lightBlack}>
                Size: {i.size}
              </Text>
              <HStack justifyContent="space-between">
                <HStack space={2}>
                  <InputSpinner
                    max={maxQty[index]}
                    min={1}
                    step={1}
                    height={22}
                    initialValue={1}
                    width={80}
                    buttonFontSize={19}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    skin="round"
                    onChange={_.debounce((num) => {
                      const updatedPrice = [...actualPrice];
                      updatedPrice[index] = num * actualPrice[index];
                      setChangePrice(updatedPrice);
                    }, 500)}
                  />
                  <MaterialIcons
                    onPress={() => handleRemove(i.cart_id)}
                    name="delete"
                    size={24}
                    color="red"
                  />
                </HStack>
                <Text color={Colors.green} fontWeight="semibold">
                  ₹{changePrices[index]}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        ))}  */}
    </Box>
  );
}
