import {
  Box,
  Text,
  Center,
  HStack,
  Image,
  ScrollView,
  Skeleton,
  VStack,
  View,
  Flex,
} from "native-base";
import React, { useState } from "react";
import { GetAllProducts } from "../../Controller/Product/ProductController";
import { Colors } from "../../color";
import ProductCard from "../../Componentes/Home/ProductCard";
import img2 from "../../Assets/Images/trending-text.jpeg";
import { useFocusEffect } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import banner1 from "../../Assets/Images/offer1.jpg";
import banner2 from "../../Assets/Images/offer2.jpg";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const sliderImages = [banner1, banner2];

export default function Trendings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //Get all products
  const getHomeProducts = async () => {
    const response = await GetAllProducts();
    const data = await response.data
      .map((obj) => obj.colorDetails)
      .flat()
      .filter((obj) => obj.top_selling === "true");
    setProducts(data);
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getHomeProducts();
    }, [])
  );

  return (
    <Box flex={1} w="full" bg={Colors.white}>
      <Image alt="banner" w="full" h={20} source={img2} />
      <ScrollView horizontal={true}>
        <HStack space={4}>
          <VStack>
            <Center
              h={300}
              w={180}
              bg={Colors.lightSkyBlue}
              ml={2}
              rounded={10}
              shadow={4}
              my={1}
            >
              <Swiper
                style={styles.wrapper}
                showsButtons={true}
                autoplay={true}
                autoplayTimeout={7}
                showsPagination={false}
                height={300}
              >
                {sliderImages &&
                  sliderImages.map((image, index) => (
                    <View key={index} style={styles.slide}>
                      <Image
                        source={image}
                        w={width}
                        h={300}
                        alt="banner"
                        resizeMode="cover"
                        rounded={10}
                      />
                    </View>
                  ))}
              </Swiper>
            </Center>
            <Box
              ml={2}
              mt={4}
              py={3}
              bg={Colors.lightSkyBlue}
              shadow={2}
              borderWidth={0.5}
              borderColor={Colors.lightSkyBlue}
              rounded={30}

            >
              <Pressable>
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  flexDirection="row"
                  space={3}
                  justify="center"
                >
                  <Text bold fontSize={20}>
                    View All
                  </Text>
                  <Feather name="arrow-right-circle" size={30} color="black" />
                </HStack>
              </Pressable>
            </Box>
          </VStack>
          <VStack>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <HStack space={2} key={index}>
                      <Skeleton w="100px" h="160px" borderRadius={5} mr={2} />
                    </HStack>
                  ))
                : products.slice(0, 3).map((item, index) => (
                    <HStack space={2} px={1} key={index}>
                      <ProductCard item={item} />
                    </HStack>
                  ))}
            </ScrollView>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <HStack space={2} key={index}>
                      <Skeleton w="100px" h="160px" borderRadius={5} mr={2} />
                    </HStack>
                  ))
                : products.slice(3, 6).map((item, index) => (
                    <HStack space={2} px={1} key={index}>
                      <ProductCard item={item} />
                    </HStack>
                  ))}
            </ScrollView>
          </VStack>
        </HStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  image: {
    width: width,
    height: 300,
  },
});
