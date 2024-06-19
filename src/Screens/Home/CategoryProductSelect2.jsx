import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { GetSubCategory } from "../../Controller/Product/ProductController";
import { api } from "../../Config/api";

export default function CategoryProductSelect2({ selectedCategory, cat_id }) { 
  const navigation = useNavigation();
  const [subCategory, setSubCategory] = useState([]);
 

  const getSubCat = async () => {
    try {
      const response = await GetSubCategory();
      console.log(response)
      if (response.status) {
        setSubCategory(
          response.data.filter((item) => item.cat_name == selectedCategory)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSubCat();
    }, [selectedCategory])
  );

  return (
    <View>
      <Text py={3} borderBottomWidth={1} bold fontSize={18}>
        {selectedCategory}
      </Text>
      <ScrollView h="full" py={6} px={3}>
        <Flex
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          px={3}
          py={2}
          justifyContent="space-between"
        >
          {subCategory.map((i, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("Products", {
                  sub_cat_id: i.id,
                  cat_id : cat_id,
                })
              }
            >
              <Center
                mb={6}
                shadow={4}
                w={24}
                h={24}
                rounded="full"
                bg={Colors.lightGreen}
              >
                <Image
                  alt="img"
                  source={{ uri: `${api.API_URL}assets/img/${i.image_url}` }}
                  w={16}
                  h={16}
                  resizeMode="contain"
                />
                <Text
                  bg={Colors.skyBlueLight}
                  px={2.5}
                  rounded={4}
                  fontWeight="semibold"
                >
                  {i.name}
                </Text>
              </Center>
            </Pressable>
          ))}
        </Flex>
      </ScrollView>
    </View>
  );
}
