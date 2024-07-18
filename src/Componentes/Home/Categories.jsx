import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import { GetProductCategories } from "../../Controller/Product/ProductController";
import { api } from "../../Config/api";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();

  const getCategoriesData = async () => {
    try {
      const response = await GetProductCategories();
      if (response.status === true) {
        setCategoryData(response.data);
        setLoading(false);
      }
    } catch (error) {
      throw error
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCategoriesData();
    }, [])
  );

  return (
    <Box>
      <ScrollView
        horizontal={true}
        py={4}
        showsHorizontalScrollIndicator={false}
        bg={Colors.transperent}
      >
        <HStack space={2} px={4}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} w="60px" h="60px" borderRadius="full" />
              ))
            : categoryData &&
              categoryData.map((i, index) => (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate("Categoriesnav")}
                >
                  <VStack>
                    <Center
                      h="60px"
                      w="60px"
                      p={0.5}
                      rounded="full"
                      overflow="hidden"
                      borderWidth={0.5}
                      borderColor={Colors.whiteTrans}
                    >
                      <Center bg={Colors.skyBlueLight} rounded="full" w="full" h="full">
                        <Image
                          alt="img"
                          source={{
                            uri: `${api.API_URL}assets/img/${i.image_url}`,
                          }}
                          h="50px"
                          w="50px"
                          resizeMode="contain"
                        />
                      </Center>
                    </Center>
                    <Text
                      shadow={1}
                      bg={Colors.skyBlueLight}
                      mt={-2}
                      rounded={4}
                      fontSize="12px"
                      bold
                      textAlign="center"
                    >
                      {i.name}
                    </Text>
                  </VStack>
                </Pressable>
              ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}
