import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import noOrderPic from "../../Assets/Images/no-orders.webp";
import { Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { GetUserOrders } from "../../Controller/User/UserController";
import { api } from "../../Config/api";

export default function UserOrdersList() {
  const [orders, setOrders] = useState([]); 
  const navigation = useNavigation();

  const getUserOrders = async () => {
    try {
      const response = await GetUserOrders();
      if (response.status) {
        setOrders(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserOrders();
    }, [])
  );

  return (
    <Box flex={1} bg={Colors.lightGreen}>
      <ScrollView w="full" px={1} showsVerticalScrollIndicator={false}>
        {orders && orders.length === 0 ? (
          <Center py={10}>
            <Image alt="no-order" w={200} h={200} source={noOrderPic} />
            <Text mt={10}>No Order Found. </Text>
          </Center>
        ) : (
          orders.map((i, index) => (
            <Pressable
              key={index}
              onPress={() => navigation.navigate("Order-Detail", { data: i })}
            >
              <HStack
                bg={Colors.white}
                py={3}
                borderBottomWidth={1}
                borderBottomColor={Colors.lightBlack}
              >
                <Box w="25%">
                  <Image
                    w={20}
                    h={20}
                    alt="product"
                    source={{
                      uri: `${api.API_URL}assets/img/${i.colorDetails[0].image_url[0].url}`,
                    }}
                  />
                </Box>
                <Box w="75%" px={2} py={2}>
                  <VStack space={1}>
                    <Text isTruncated fontWeight="semibold" fontSize={17}>
                      {i.name}
                    </Text>
                    <Text color={Colors.lightBlack} isTruncated>
                      Qty:{i.qty}
                    </Text>
                    <Text color={Colors.lightBlack}>
                      Ordered on {i.date.split("T")[0]}
                    </Text>
                  </VStack>
                </Box>
              </HStack>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Box>
  );
}
