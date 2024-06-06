import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { useNavigation } from "@react-navigation/native";
import CartItem2 from "./CartItem2";
import { StatusBar } from "expo-status-bar";
import CheckOut from "../Orders/CheckOut";

export default function CartScreen() {
  const navigation = useNavigation();
  const [overAllCost, setOverAllCost] = useState(0);
  const totalCost = (totalPrice) => {
    setOverAllCost(totalPrice);
  };
  return (
    <Box safeAreaTop flex={1} bg="#E5FFE1">
      <StatusBar style="dark" />
      <Center w="full" py={5}>
        <Text color={Colors.black} fontSize={22} bold>
          Cart
        </Text>
      </Center>
      {/*  <CartEmpty/> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItem2 totalCost={totalCost} />
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
              <Text color={Colors.white} bold>₹{overAllCost}</Text>
            </Button>
          </HStack>
        </Center>
        
        {/*Check out button */}
        <CheckOut overAllCost={overAllCost}/>

        <Box py={6}></Box>
      </ScrollView>
    </Box>
  );
}
