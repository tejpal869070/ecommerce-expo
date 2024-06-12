import {
  Box,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import logo from "../../Assets/Images/logo.png";
import { GetAllProducts } from "../../Controller/Product/ProductController";
import { useFocusEffect } from "@react-navigation/native";
import SearchedProducts from "../../Screens/Products/SearchedProducts";

export default function SearchBox() {
  const [searchKey, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await GetAllProducts();
      if (response.status) {
        setAllProducts(response.data.map((item) => item.colorDetails).flat());
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllProducts();
    }, [])
  );

  const handleSearch = async (value) => {
    setSearch(value);
    if (value.length > 0) {
      setIsOpen(true);
      const filterProduct =
        allProducts &&
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredProducts(filterProduct);
    } else {
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setIsOpen(false);
  };

  return (
    <Box safeAreaTop bg={Colors.lightGreen}>
      <HStack space={4} w="full" px={6} py={3} alignItems="center">
        <Image alt="logo" width={10} h={10} source={logo} />
        <Input
          placeholder="Restaurant, food"
          bg={Colors.white}
          w="70%"
          type="search"
          fontSize={16}
          borderWidth={0}
          borderColor={Colors.lightBlack}
          borderTopWidth={0.5}
          borderBottomWidth={0.5}
          borderLeftWidth={0.5}
          value={searchKey}
          onChangeText={(value) => handleSearch(value)}
          InputRightElement={
            <Entypo
              name="circle-with-cross"
              size={20}
              onPress={() => clearSearch()}
              color="black"
            />
          }
          borderRightWidth={0.5}
          variant="outline"
          _focus={{
            bg: Colors.white,
          }}
          pr={2}
        />
        <Pressable>
          <FontAwesome name="bell" size={24} color="black" />
          <Box
            px={1}
            rounded="full"
            position="absolute"
            bg={Colors.red}
            top={-13}
            left={2}
            _text={{ color: Colors.white }}
          >
            5
          </Box>
        </Pressable>
      </HStack>
      {isOpen && (
        <ScrollView
          h="full"
          w="full"
          bg={Colors.lightGreen}
          showsVerticalScrollIndicator={false}
        >
          <SearchedProducts filteredProducts={filteredProducts} />
        </ScrollView>
      )}
    </Box>
  );
}
