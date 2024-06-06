import { Box, Center, HStack, Heading, Image, Text, VStack } from "native-base";
import React, { useState } from "react";
import RatingStar from "./RatingStar";
import { Colors } from "../../color";
import { Reviews } from "../../Assets/Data/UserData";

export default function Review() {
  return (
    <Box mt={3} bg={Colors.white} py={3} mx={1} rounded={5} shadow={4}>
      <Heading bold px={3} fontSize={15} mb={2} color={Colors.green}>
        REVIEWS
      </Heading>

      {Reviews.map((i, index) => (
        <HStack
          w="full"
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          py={2}
          key={index}
        >
          <VStack w="80%" px={2}>
            <RatingStar value={i.rating} />
            <Text color={Colors.lightBlack} fontSize={12}>
              Review for {i.ReviewFor}
            </Text>
            <Text mt={1} fontSize={16}>
              {i.review}
            </Text>
          </VStack>
          <Center w="20%" p={1}>
            <Image alt="review" w={20} h={20} source={i.image} />
          </Center>
        </HStack>
      ))}
    </Box>
  );
}
