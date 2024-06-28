import { Box, HStack, Heading, Image, Pressable, Text } from "native-base";
import React from "react";
import { Colors } from "../../color";
import { api } from "../../Config/api";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import bg1 from "../../Assets/Images/product-bg.jpg";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      w={140}
      rounded="md"
      bg={Colors.white}
      shadow={2}
      onPress={() => navigation.navigate("Single", { itemId: item.id })}
    >
      <ImageBackground
        source={bg1}
        alt="Background Image"
        resizeMode="cover"
        style={{ padding: "40px" }}
      >
        <Image
          source={{ uri: `${api.API_URL}assets/img/${item.image_url[0].url}` }}
          alt="imath"
          w="80%"
          h="120px"
          mt={2}
          resizeMode="cover"
          rounded={10}
          m="auto"
        />
        <Box px={1.5} pt={3} mb={2}>
          <Text isTruncated fontSize="15px" bold>
            {item.name}
          </Text>
          <HStack justifyContent="space-between" mt={1}>
            <Text
              bg={Colors.green}
              rounded={5}
              px={1}
              color={Colors.white}
              bold
            >
              4.5 <FontAwesome name="star" size={11} color="gold" />
            </Text>
            <Heading fontSize="16px" mt={1} color={Colors.green}>
              ₹{item.sizeDetails[0].regular_price}
            </Heading>
          </HStack>
        </Box>
      </ImageBackground>

      {/*
      {product.top_selling === "true" ? (
        <Image
          alt="top"
          source={topimg}
          w={10}
          h={10}
          top={0}
          position="absolute"
        />
      ) : product.top ? (
        <Image
          alt="top"
          source={newimg}
          w="39px"
          h="39px"
          top={0}
          position="absolute"
        />
      ) : (
        ""
      )}
    */}
    </Pressable>
  );
}
