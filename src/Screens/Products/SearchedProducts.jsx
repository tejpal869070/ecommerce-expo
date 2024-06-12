import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import bg1 from "../../Assets/Images/product-bg.jpg";
import { ImageBackground } from "react-native";
import { api } from "../../Config/api";
import { Colors } from "../../color";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SearchedProducts({ filteredProducts }) {
  const navigation = useNavigation();
  const [prodcts, setProducts] = useState([]);
  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts]);

  return (
    <Box flex={1}>
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        mx={2}
      >
        {prodcts.length === 0 ? (
          <Center w="full" h={40}>
            <Text>No product found.</Text>
          </Center>
        ) : (
          prodcts &&
          prodcts.map((item, index) => (
            <Pressable
              w="32%"
              rounded={4}
              mb={2}
              key={index}
              shadow={2}
              onPress={() => navigation.navigate("Single", { itemId: item.id })}
            >
              <ImageBackground
                source={bg1}
                alt="Background Image"
                resizeMode="cover"
              >
                <VStack px={1} py={2}>
                  <Image
                    alt="prod"
                    rounded={10}
                    w={32}
                    h={32}
                    resizeMode="cover"
                    source={{
                      uri: `${api.API_URL}assets/img/${item.image_url[0].url}`,
                    }}
                  />
                  <Text fontWeight="semibold" fontSize={14} isTruncated>
                    {item.name}
                  </Text>
                  <HStack justifyContent="space-between" mt={1}>
                    <Text
                      bg={Colors.lightGreen}
                      rounded={5}
                      px={1}
                      color={Colors.black}
                      borderWidth={0.4}
                      bold
                    >
                      4.5 <FontAwesome name="star" size={11} color="gold" />
                    </Text>
                    <Heading fontSize="16px" mt={1} color={Colors.green}>
                      ₹{item.sizeDetails[0].regular_price}
                    </Heading>
                  </HStack>
                </VStack>
              </ImageBackground>
            </Pressable>
          ))
        )}
      </Flex>
      <Box h={100} />
    </Box>
  );
}
