import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React from "react";
import { Colors } from "../../color";
import { CategorySubCategoryProducts } from "../../Assets/Data/Categories";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

export default function CategoryProductSelect2({ selectIndex }) {
  const navigation = useNavigation();
  return (
    <View>
      <Text py={3} borderBottomWidth={1} bold fontSize={18}>{(CategorySubCategoryProducts[selectIndex].cat_name).toUpperCase()}</Text>
      <ScrollView h="full" py={6} px={3}>
        <Flex
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          px={3}
          py={2}
          justifyContent="space-between"
        >
          {CategorySubCategoryProducts[selectIndex].sub_cat_details.map(
            (i, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("SubCategoryProducts")}
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
                    source={i.subcat_img}
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
                    {i.subcat_name}
                  </Text>
                </Center>
              </Pressable>
            )
          )}
        </Flex>
      </ScrollView> 
    </View>
  );
}
