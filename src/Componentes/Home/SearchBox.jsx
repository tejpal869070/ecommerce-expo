import { Box, HStack, Image, Input, Pressable, Text } from "native-base";
import React from "react";
import { Colors } from "../../color";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import logo from "../../Assets/Images/logo.png"

export default function SearchBox() {
  return (
    <HStack
      space={4}
      w="full"
      px={6}
      py={3}
      alignItems="center"
      safeAreaTop
      bg={Colors.lightGreen}
    >
    <Image alt="logo" width={10} h={10} source={logo}/>
      <Input
        placeholder="Restaurant, food"
        bg={Colors.white}
        w="70%"
        type="search"
        fontSize={16}
        borderWidth={0}
        borderColor={Colors.lightBlack}
        borderTopWidth={0.5}
        borderBottomWidth={0.5}
        borderLeftWidth={0.5}
        borderRightWidth={0.5}
        variant="outline"
        _focus={{
          bg: Colors.white,
        }}
        pr={2}
      />
      <Pressable>
        <FontAwesome name="bell" size={24} color="black" />
        <Box
          px={1}
          rounded="full"
          position="absolute"
          bg={Colors.red}
          top={-13}
          left={2}
          _text={{ color: Colors.white }}
        >
          5
        </Box>
      </Pressable>
    </HStack>
  );
}
