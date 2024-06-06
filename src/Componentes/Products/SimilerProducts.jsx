import { Box, Flex, Heading, Image, Pressable, Text } from "native-base";
import React from "react";
import { Colors } from "../../color";
import RatingStar from "./RatingStar";
import { FashionClothsData } from "../../Assets/Data/FashionClothsData";

export default function SimilerProducts() {
  return (
    <Box mt={6} mx={1}>
      <Heading mb={2} px={2}>
        Similer Products
      </Heading>
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        flex={1}
        flexDirection="row"
        w="full"
      >
        {FashionClothsData.slice(0, 10).map((i, index) => (
          <Pressable
            pt={2}
            pb={2}
            w="48%"
            rounded="md"
            bg={Colors.white}
            shadow={2}
            key={index}
            mb={2}
          >
            <Image
              source={{ uri: i.image_url }}
              alt="imath"
              w="95%"
              h={40}
              resizeMode="cover"
              rounded={2}
              m="auto"
            />
            <Box px={3} pt={3}>
              <RatingStar value={5} size="10" />
              <Text isTruncated fontSize="15px" bold>
                {i.title}
              </Text>
              <Heading fontSize="17px" mt={1} color={Colors.green}>
                ₹{i.regular_price}
              </Heading>
            </Box>
          </Pressable>
        ))}
      </Flex>
    </Box>
  );
}
