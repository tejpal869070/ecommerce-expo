import {
  Button,
  Center,
  HStack,
  Modal,
  Radio,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetUserDetails } from "../../Controller/User/UserController";

export default function CheckOut({ totalPrice, buy, buyData }) {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);

 

  // amount handle
  const deliverCharges = (totalPrice * 0.1) / 100;
  const discount = (totalPrice * 10) / 100;
  const total = totalPrice + deliverCharges - discount;

  // user address
  const getUserDetails = async () => {
    const response = await GetUserDetails();
    if (response.data.length < 1) {
      alert("Something went wrong.");
      setUserData({});
    } else {
      setAddress(response.data[0].address);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, [])
  );

  return (
    <Center px={5}>
      {buy ? (
        <Button
          w={170}
          rounded={0}
          bg={Colors.main}
          _text={{ fontSize: "18px", fontWeight: "bold" }}
          borderRightRadius={18}
          shadow={4}
           
          mx={-5}
        >
          Buy
        </Button>
      ) : (
        <Button
          bg={Colors.black}
          mt={4}
          w="full"
          rounded="full"
          py={4}
          mx={4}
          _pressed={{ bg: Colors.black }}
          _text={{ fontWeight: "bold" }}
          onPress={() => navigation.navigate("Checkout-screen")}
        >
          CHECKOUT
        </Button>
      )}
      
    </Center>
  );
}
