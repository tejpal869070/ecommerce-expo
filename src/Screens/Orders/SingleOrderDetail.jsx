import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { Colors } from "../../color";
import { api } from "../../Config/api";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function SingleOrderDetail() {
  const route = useRoute();
  const { data } = route.params;
  return (
    <Box showsVerticalScrollIndicator={false} bg={Colors.lightWhite}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          py={2}
          px={3}
          borderBottomWidth={0.5}
          borderBottomColor={Colors.lightBlack}
        >
          <Text color={Colors.lightBlack}>Order ID:- {data.order_id}</Text>
        </Box>
        <HStack
          w="full"
          py={5}
          px={3}
          borderBottomWidth={0.5}
          borderBottomColor={Colors.lightBlack}
        >
          <VStack w="75%" space={1.5}>
            <Text fontSize={16} fontWeight="semibold">
              {data.name}
            </Text>
            <Text bold color={Colors.green} fontSize={20}>
              Rs.{data.price}
            </Text>
            <HStack space={2}>
              <Text mt={-1} color={Colors.lightBlack}>
                Quantity.{data.qty}
              </Text>
              <Text mt={-1} color={Colors.lightBlack}>
                Size.{data.size}
              </Text>
            </HStack>
          </VStack>
          <Center w="25%">
            <Image
              alt="img"
              w={20}
              h={20}
              source={{
                uri: `${api.API_URL}assets/img/${data.colorDetails[0].image_url[0].url}`,
              }}
            />
          </Center>
        </HStack>

        {/*delivery details*/}
        <VStack py={4} px={4} space={3}>
          <HStack space={4}>
            <FontAwesome name="check-circle" size={20} color="green" />
            <Text color={Colors.lightBlack}>
              Ordered On{" "}
              {data.date &&
                data.date.split("T")[0].split("-").reverse().join("-")}
            </Text>
          </HStack>
          <HStack space={4}>
            <FontAwesome name="check-circle" size={20} color="green" />
            <Text color={Colors.lightBlack}>
              Delivered On{" "}
              {data.delivery_date &&
                data.delivery_date.split("T")[0].split("-").reverse().join("-")}
            </Text>
          </HStack>
        </VStack>

        {/*invoice details*/}
        {/* <Pressable>
          <HStack
            justifyContent="space-between"
            alignItems="center"
            bg={Colors.white}
            px={3}
            mx={1}
            rounded={5}
            mb={2}
            py={3}
            shadow={4}
          >
            <HStack space={2}>
              <AntDesign name="filetext1" size={24} color="black" />
              <Text fontSize={16}>Download Invoice</Text>
            </HStack>
            <AntDesign name="right" size={18} color="black" />
          </HStack>
        </Pressable> */}

        {/*Shipping details*/}
        <VStack
          pb={4}
          space={3}
          mx={1}
          rounded={5}
          bg={Colors.white}
          shadow={2}
        >
          <Text
            px={3}
            py={2}
            borderBottomWidth={0.5}
            borderBottomColor={Colors.lightBlack}
            color={Colors.lightBlack}
          >
            Shipping Details
          </Text>
          <VStack px={3}>
            <Text fontWeight="semibold" fontSize={20}>
              {data.address.name}
            </Text>
            <Text>{data.address.street}</Text>
            <Text>{data.address.city}</Text>
            <Text>
              {data.address.state} ({data.address.country}) -{" "}
              {data.address.pincode}
            </Text>
            <Text>Phone number: {data.address.phone}</Text>
          </VStack>
        </VStack>

        {/*Price details*/}
        <VStack
          pb={4}
          space={3}
          mx={1}
          rounded={5}
          bg={Colors.white}
          shadow={2}
          mt={2}
        >
          <Text
            px={3}
            py={2}
            borderBottomWidth={0.5}
            borderBottomColor={Colors.lightBlack}
            color={Colors.lightBlack}
          >
            Price Details
          </Text>
          <VStack px={3} space={3}>
            <HStack justifyContent="space-between">
              <Text>Regular Price</Text>
              <Text>₹{data.colorDetails[0].sizeDetails[0].regular_price + 40}</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Selling Price</Text>
              <Text>
                ₹{data.colorDetails[0].sizeDetails[0].regular_price}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Extra Discount</Text>
              <Text color={Colors.green}>-₹40</Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text>Delivery Charges</Text>
              <Text>+₹40</Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              borderStyle="dotted"
              borderTopWidth={1}
            >
              <Text fontSize={16} fontWeight="semibold">
                Total Amount
              </Text>
              <Text fontSize={16} fontWeight="semibold" color={Colors.green}>
                ₹{data.colorDetails[0].sizeDetails[0].regular_price}
              </Text>
            </HStack>
          </VStack>
        </VStack>

        {/*payment type*/}
        <Box
          px={3}
          py={2}
          bg={Colors.white}
          mx={1}
          rounded={5}
          shadow={4}
          mt={1}
        >
          <Text>Paid via {data.payment_type}</Text>
        </Box>
        <Box h={10} w="full"></Box>
      </ScrollView>
    </Box>
  );
}
