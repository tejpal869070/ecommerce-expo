import {
  Box,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Pressable } from "react-native";
import img1 from "../../Assets/Images/trending-img.png";
import img2 from "../../Assets/Images/cat5.png";
import { FontAwesome } from "@expo/vector-icons";
import { GetSubCategoryProducts } from "../../Controller/Product/ProductController";
import { api } from "../../Config/api";

export default function SubCategoryProducts() {
  const navigation = useNavigation();
  const params = useRoute();
  const { cat_id, sub_cat_id } = params.params;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const formData = {
    cat_id: cat_id,
    sub_cat_id: sub_cat_id,
  };

  const getProducts = async () => {
    try {
      const response = await GetSubCategoryProducts(formData);
      if (response.status) {
        // setProducts(response.data);
        const data = response.data.map((item) => item.colorDetails).flat();
        console.log(data);
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [cat_id, sub_cat_id])
  );

  return (
    <Box flex={1} bg={Colors.lightGreen}>
      <ScrollView h="full" w="full" showsVerticalScrollIndicator={false}>
        <Center>
          <Image
            w="80%"
            h="140px"
            alt="banner"
            source={img1}
            resizeMode="contain"
          />
        </Center>
        <Flex
          px={2}
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {products &&
            products.map((i, index) => (
              <Box
                w="48%"
                key={index}
                bg={Colors.lightGreen}
                shadow={2}
                mb={2}
                rounded={5}
                borderWidth={0.4}
                borderColor={Colors.lightBlack}
                p={1.5}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("Single", { itemId: i.id })
                  }
                >
                  <VStack>
                    <Center>
                      <Image
                        w={40}
                        h={40}
                        alt="prod"
                        source={{
                          uri: `${api.API_URL}assets/img/${i.image_url[0].url}`,
                        }}
                      />
                    </Center>
                    <Text isTruncated fontWeight="semibold">
                      {i.name}
                    </Text>
                    <Text
                      bg={Colors.green}
                      rounded={5}
                      px={1}
                      w={12}
                      mt={1}
                      color={Colors.white}
                      bold
                    >
                      4.5 <FontAwesome name="star" size={11} color="gold" />
                    </Text>
                    <HStack justifyContent="space-between" mt={1}>
                      <HStack space={0.5}>
                        <Heading
                          textDecorationLine="line-through"
                          fontSize="16px"
                          mt={1}
                          color={Colors.lightBlack}
                        >
                          ₹249
                        </Heading>
                        <Heading fontSize="16px" mt={1} color={Colors.green}>
                          ₹200
                        </Heading>
                      </HStack>
                    </HStack>
                  </VStack>
                </Pressable>
              </Box>
            ))}
        </Flex>
      </ScrollView>
    </Box>
  );
}
