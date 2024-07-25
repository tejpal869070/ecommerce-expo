import { Box, HStack, Heading, Text, VStack } from "native-base";
import React from "react";
import { Colors } from "../../color";
import RatingStar from "../../Componentes/Products/RatingStar";
import AvailableSize from "./AvailableSize";
import Policies from "../../Componentes/Products/Policies";
import { Entypo } from "@expo/vector-icons";

export default function ProductDetails({ productData }) {
  return (
    <Box mt={2}  >
      <Heading px={2} fontSize={18} mb={1}>
        {productData.name}
      </Heading>

      <HStack
        px={2}
        justifyContent="space-between"
        alignItems="center"
        space={2}
      >
        <HStack space={1}>
          <Text
            fontSize={20}
            color={Colors.lightBlack}
            bold
            textDecorationLine="line-through"
          >
            ₹{productData.colorDetails[0].sizeDetails[0].regular_price + 449}
          </Text>
          <Text fontSize={20} color={Colors.green} bold>
            ₹{productData.colorDetails[0].sizeDetails[0].regular_price}
          </Text>
        </HStack>
        <RatingStar
          value={
            productData.rating
              .map((item) => item.rating)
              .reduce((acc, cur) => acc + cur, 0) / productData.rating.length
          }
          count={productData.rating.length}
        />
      </HStack>

      {/* <AvailableSize productData={productData} /> */}
      <Policies />

      {/*Specifications */}
      <VStack mt={3} bg={Colors.white} mx={1} rounded={5} py={1}>
        <Heading
          borderBottomWidth={0.5}
          py={2}
          bold
          px={3}
          fontSize={15}
          mb={2}
          color={Colors.green}
        >
          DETAILS
        </Heading>
        {productData.colorDetails[0].description.split(",").map((i, index) => (
          <HStack key={index}>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>{i}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
