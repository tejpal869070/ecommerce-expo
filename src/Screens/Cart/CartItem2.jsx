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

export default function CartItem2({ isZero,   productData }) {
  const toast = useToast();
  const [isClicked, setIsClicked] = useState(true);
  const [cartData, setCartData] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemove = async (id) => {
    try {
      const response = await CartRemove(id);
      if (response.status) {
        const previousData = await SecureStore.getItemAsync("cartData");
        const data = JSON.parse(previousData);
        const newData = data.filter((item) => item.id !== id);
        await SecureStore.setItemAsync("cartData", JSON.stringify(newData));
        isZero();
        toast.closeAll();
        toast.show({ title: "Removed", placement: "top" });
      }
    } catch (error) {
      alert("Something Went Wrong.");
    }
  };

  const getLocalCartData = async () => {
    try {
      const cartData = await SecureStore.getItemAsync("cartData");
      setCartData(JSON.parse(cartData));
    } catch (error) {
      setCartData([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getLocalCartData();
    }, [])
  );

  return (
    <Box px={3}>
      {productData &&
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
                  {cartData && (
                    <InputSpinner
                      min={1}
                      step={1}
                      height={22}
                      initialValue={
                        cartData.find((item) => item.id === i.cart_id).qty
                      }
                      width={80}
                      buttonFontSize={19}
                      colorMax={"#f04048"}
                      colorMin={"#40c5f4"}
                      skin="round"
                      onChange={async (value) => {
                        try {
                          const data = await SecureStore.getItemAsync(
                            "cartData"
                          );
                          const cartData = JSON.parse(data);
                          const changeData = cartData.map((item) => {
                            if (item.id == i.cart_id) {
                              item.qty = value;
                            }
                            return item;
                          });
                          setCartData(changeData);
                          await SecureStore.setItemAsync(
                            "cartData",
                            JSON.stringify(changeData)
                          );
                          isZero()
                        } catch (error) {
                          console.error(
                            "Error fetching or parsing cart data:",
                            error
                          );
                        }
                      }}
                    />
                  )}
                  <MaterialIcons
                    onPress={() => handleRemove(i.cart_id)}
                    name="delete"
                    size={24}
                    color="red"
                  />
                </HStack>
                <Text color={Colors.green} fontWeight="semibold">
                  ₹
                  {cartData &&
                    cartData.find((item) => item.id === i.cart_id).qty *
                      i.colorDetails[0].sizeDetails[0].regular_price}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        ))}
    </Box>
  );
}
