import { StatusBar } from "expo-status-bar";
import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import { CategorySubCategoryProducts } from "../../Assets/Data/Categories";
import { api } from "../../Config/api";
import CategoryProductSelect2 from "./CategoryProductSelect2";
import { GetProductCategories } from "../../Controller/Product/ProductController";
import { useFocusEffect } from "@react-navigation/native";

export default function CategoryProductSelect() {
  const [selectIndex, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
 

  const getCategoriesData = async () => {
    try {
      const response = await GetProductCategories();
      if (response.status === true) {
        setCategoryData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCategoriesData();
    }, [])
  );

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      flexWrap="nowrap"
      flex={1}
      safeAreaTop
    >
      <StatusBar style="dark" hidden={false} />
      <Box w="24%" bg={Colors.lightGreen} shadow={4}>
        <ScrollView showsVerticalScrollIndicator={false} h="full" py={12}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  w="90%"
                  h="90px"
                  borderRadius="5"
                  mb={2}
                />
              ))
            : categoryData.map((i, index) => (
                <Pressable key={index} onPress={() => setIndex(index)}>
                  <Center
                    py={1.5}
                    style={{
                      backgroundColor:
                        index === selectIndex ? Colors.white : Colors.lightGreen,
                      borderTopLeftRadius: index === selectIndex ? 16 : 0,
                      borderBottomLeftRadius: index === selectIndex ? 16 : 0,
                      borderTopWidth: index === selectIndex ? 0.5 : 0,
                      borderLeftWidth: index === selectIndex ? 0.5 : 0,
                      borderBottomWidth: index === selectIndex ? 0.5 : 0,
                    }}
                  >
                    <VStack>
                      <Image
                        w={20}
                        h={20}
                        source={{
                          uri: `${api.API_URL}assets/img/${i.image_url}`,
                        }}
                        alt={i.name}
                        resizeMode="center"
                      />
                      <Text
                        textAlign="center"
                        color={Colors.black}
                        fontWeight="semibold"
                        mt={1}
                      >
                        {i.name}
                      </Text>
                    </VStack>
                  </Center>
                </Pressable>
              ))}
        </ScrollView>
      </Box>
      <Box w="73%">
        <CategoryProductSelect2 selectIndex={selectIndex} />
      </Box>
    </Flex>
  );
}
