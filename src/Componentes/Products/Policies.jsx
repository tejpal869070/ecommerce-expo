import { Center, HStack, Text } from "native-base";
import React from "react";
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "../../color";

const data = [
  {
    id: 1,
    icon: <FontAwesome name="rotate-left" size={24} color="black" />,
    description: "10 Days Return Policy",
  },
  {
    id: 1,
    icon: (
      <MaterialCommunityIcons name="cash-multiple" size={24} color="black" />
    ),
    description: "Cash on Delivery Available",
  },
  {
    id: 1,
    icon: <MaterialIcons name="remove-shopping-cart" size={24} color="black" />,
    description: "Cancellation upto 24 hrs.",
  },
];

export default function Policies() {
  return (
    <HStack
      mt={1}
      px={4}
      justifyContent="space-around"
      py={3} 
      rounded={5}
      bg={Colors.white}
      mx={1}
    >
      {data.map((i, index) => (
        <Center key={index} w="30%">
          {i.icon}
          <Text mt={1} textAlign="center" fontSize={12}>
            {i.description}
          </Text>
        </Center>
      ))}
    </HStack>
  );
}
