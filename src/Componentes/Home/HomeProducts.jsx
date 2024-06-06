import {
  Box,
  Flex,
  Heading,
  Image,
  Pressable,
  Skeleton,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import { GetAllProducts } from "../../Controller/Product/ProductController";

export default function HomeProducts() {
  const [ProductsSeperate, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all products
  const getHomeProducts = async () => {
    const response = await GetAllProducts(); 
  };

  useEffect(() => {
    getHomeProducts();
  }, []);

  return (
    <Flex
      flex={1}
      flexDirection="row"
      flexWrap="wrap"
      px={3}
      py={2}
      justifyContent="space-between"
      w="full"
    >
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} w="48%" h="160px" borderRadius={5} mb={2} />
          ))
        : ProductsSeperate.map((item, index) => (
            <Pressable
              onPress={() => navigation.navigate("Single", { itemId: item.id })}
              pt={2}
              my={3}
              pb={2}
              w="48%"
              rounded="md"
              bg={Colors.white}
              key={index}
              shadow={2}
            >
              <Image
                source={{
                  uri: `${api.API_URL}assets/img/${item.image_url[0].url}`,
                }}
                alt="imath"
                w="95%"
                h={32}
                resizeMode="center"
                m="auto"
              />
              <Box px={3} pt={3}>
                <Text fontSize="16px" isTruncated>
                  {item.name}
                </Text>
                <Heading fontSize="14px" color={Colors.green}>
                  ₹200
                </Heading>
                <Rating value={4} size="12" />
              </Box>
            </Pressable>
          ))}
    </Flex>
  );
}
