import { Box, Center, HStack, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { Colors } from "../../color";

const size = ["S", "M", "L", "XL", "XXL"];
const MobileSize = ["6/64", "8/128", "16/256"];

export default function AvailableSize({ productData }) {
  return (
    <Box px={3} mx={1} mt={2} bg={Colors.white} rounded={5} py={2}>
      <VStack>
        <Text>Size/Varient</Text>
        {productData.category === "Fashion" ? (
          <HStack space={2.5} mt={2}>
            {size.map((i, index) => (
              <Center
                w="44px"
                h="44px"
                bg={Colors.lightWhite}
                borderWidth={1}
                rounded="full"
                key={index}
              >
                <Text bold fontSize={16} color={Colors.main}>
                  {i}
                </Text>
              </Center>
            ))}
          </HStack>
        ) : productData.category === "Mobiles" ? (
          <ScrollView horizontal={true}>
            <HStack mt={2} py={2}>
              <VStack borderWidth={1} rounded={4} py={1}>
                <Text px={2} rounded={5} fontSize={14} fontWeight="semibold">
                  6GB RAM
                </Text>
                <Text px={2} rounded={5} fontSize={14} fontWeight="semibold">
                  64GB Storage
                </Text>
              </VStack>
            </HStack>
          </ScrollView>
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
}
