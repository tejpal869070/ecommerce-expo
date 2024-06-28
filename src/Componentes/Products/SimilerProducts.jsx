import { Box, Flex, Heading, Image, Pressable, Text } from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import RatingStar from "./RatingStar";
import { useFocusEffect } from "@react-navigation/native";
import { GetAllProducts } from "../../Controller/Product/ProductController";
import { api } from "../../Config/api";

export default function SimilerProducts({ similarProducts }) {
  const [data, setData] = useState([]);
 

  const getProducts = async (similarProducts) => {
    const response = await GetAllProducts();
    setData(
      response.data
        .filter((item) => item.sub_category === similarProducts)
        .map((item) => item.colorDetails).flat()
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts(similarProducts);
    }, [similarProducts])
  );

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
        {data &&
          data.map((i, index) => (
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
                source={{
                  uri: `${api.API_URL}assets/img/${i.image_url[0].url}`,
                }}
                alt="imath"
                w="95%"
                h={40}
                resizeMode="contain"
                rounded={2}
                m="auto"
              />
              <Box px={3} pt={3}>
                <RatingStar value={5} size="10" />
                <Text isTruncated fontSize="15px" bold>
                  {i.name}
                </Text>
                <Heading fontSize="17px" mt={1} color={Colors.green}>
                  ₹{i.sizeDetails[0].regular_price}
                </Heading>
              </Box>
            </Pressable>
          ))}
      </Flex>
    </Box>
  );
}
