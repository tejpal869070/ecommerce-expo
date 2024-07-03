import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Colors } from "../../color";
import { api } from "../../Config/api";
import cartImg from "../../Assets/Images/cart.png";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MensSection({ products, banner, womens }) {
  const navigation = useNavigation();
  return (
    <Box bg={Colors.white} w="full">
      <Image
        alt="banner"
        w="96%"
        margin="auto"
        rounded={10}
        mt={4}
        h={40}
        resizeMode="cover"
        source={banner}
      />
      <Flex
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between" 
        style={{ gap: 6 }}
        mx={2}
        mt={4}
      >
        {products &&
          products.slice(0, 6).map((item, index) => (
            <Pressable
              w="47%"
              rounded={4}
              mb={2}
              key={index}
              shadow={2}
              roundedBottom={10}
              roundedLeft={10} 
              roundedTop={10}
              roundedRight={10}
              onPress={() => navigation.navigate("Single", { itemId: item.id })}
            >
              <Box bg={womens ? Colors.lightPink : Colors.lightSkyBlue} rounded={10} px={2}>
                <VStack px={1} py={2}>
                  <Image
                    alt="prod"
                    rounded={10}
                    w="100%"
                    margin="auto"
                    h={32}
                    my={1}
                    resizeMode="cover"
                    source={{
                      uri: `${api.API_URL}assets/img/${item.image_url[0].url}`,
                    }}
                  />
                  <Text fontWeight="bold" fontSize={14} isTruncated>
                    {item.name}
                  </Text>
                  <Text
                    fontSize={13}
                    color={Colors.lightBlack}
                    lineHeight={18}
                    isTruncated
                  >
                    {item.description}
                  </Text>
                  <HStack justifyContent="space-between" mt={2}>
                    <Heading fontSize="18px" color={Colors.green}>
                      ₹{item.sizeDetails[0].regular_price}
                    </Heading>
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
                  </HStack>
                </VStack>
              </Box>
            </Pressable>
          ))}

        {products && products.length % 2 !== 0 ? (
          <Pressable
            w="47%"
            rounded={4}
            mb={2}  
            roundedBottom={10}
            roundedLeft={10}
            roundedTop={10}
            roundedRight={10}
          />
        ) : (
          ""
        )}
      </Flex>
    </Box>
  );
}
