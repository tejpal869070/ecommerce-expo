import { Box, HStack, Text } from "native-base";
import React from "react";
import { Colors } from "../../color";
import { AntDesign } from "@expo/vector-icons";

export default function Help() {
  return (
    <HStack
      w="47%"
      bg={Colors.white}
      mb={4}
      py={3}
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      space={2}
      rounded="full"
      shadow={4}
    >
      <AntDesign name="customerservice" size={24} color="black" />
      <Text bold fontSize={16}>
        Help
      </Text>
    </HStack>
  );
}
