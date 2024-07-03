import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Pressable,
  Spinner,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { Colors } from "../../color";
import { api } from "../../Config/api";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  AddtoCart,
  CartData,
  CheckToken,
} from "../../Controller/User/UserController";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function SelectVarients({ visible, onClose, productData }) {
  const navigation = useNavigation();
  const toast = useToast();
  const [formError, setFormError] = useState(false);
  const [added, setAdded] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addingCart, setAddingCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  console.log("isInCart", isInCart);

  console.log("cartDataaa", cartData);
  const [price, setPrice] = useState(
    productData.colorDetails[0].sizeDetails[0].regular_price
  );
  const [selectedColor, setSelectedcolor] = useState(
    productData.colorDetails[0].color
  );

  let DefaultSelectedSize;

  for (let i = 0; i < productData.colorDetails[0].sizeDetails.length; i++) {
    const sizeDetail = productData.colorDetails[0].sizeDetails[i];
    if (sizeDetail.quantity > 0) {
      DefaultSelectedSize = sizeDetail.size;
      break;
    }
  }
  const [selectedSize, setSelectedSize] = useState(DefaultSelectedSize);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const handlePress = (index) => {
    setSelectedColorIndex((prevIndex) => (prevIndex === index ? null : index));
    setSelectedcolor(productData.colorDetails[index].color);
  };

  const sizes = productData.colorDetails[selectedColorIndex].sizeDetails.map(
    (obj) => obj.size
  );
  const sizesAvailable = productData.colorDetails[
    selectedColorIndex
  ].sizeDetails.map((obj) => obj.quantity);

  const productInCart = (selectedSizeIndex) => {
    if (
      cartData.some(
        (item) =>
          item.color === formData.color &&
          item.size === selectedSizeIndex &&
          item.product_id === formData.product_id
      )
    ) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  };

  const handleSizeChange = (selectedSizeIndex, itemIndex) => {
    setSelectedSize(selectedSizeIndex);
    productInCart(selectedSizeIndex)
    setPrice(
      productData.colorDetails[selectedColorIndex].sizeDetails[
        sizes.indexOf(selectedSizeIndex)
      ].regular_price
    );
  };

  

  const formData = {
    product_id: productData.id,
    color: selectedColor,
    size: selectedSize,
    qty: quantity,
  };

  const handleCart = async () => {
    setAddingCart(true);
    if (formData.size === undefined) {
      setFormError(true);
      setAddingCart(false);
      return;
    }
    setFormError(false);
    try {
      const response = await AddtoCart(formData);
      if (response.status) {
        productInCart(formData.size)
        toast.closeAll();
        setAdded(true);
        toast.show({ title: "Added", placement: "top" });
      }
    } catch (error) {
      console.log("eror", error);
    } finally {
      setAddingCart(false);
    }
  };

  useEffect(() => {
    if (added) {
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }
  }, [added]);

  // check user
  const CheckUserLogin = async () => {
    const isLoggedIn = await CheckToken();
    if (isLoggedIn) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      CheckUserLogin();
    }, [])
  );

  const getCartItems = async () => {
    try {
      const response = await CartData();
      setCartData(response.data);
    } catch (error) {
      setCartData([]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getCartItems();
    }, [selectedSize])
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Box
        flex={1}
        justifyContent="flex-end"
        alignItems="flex-start"
        bg={Colors.whiteTrans}
      >
        <Box
          bg={Colors.white}
          p={4}
          roundedTop={30}
          flexDirection="column"
          w="100%"
          h="55%"
          textAlign="center"
        >
          <Flex flexDirection="row" justifyContent="space-between">
            <Text></Text>
            <Entypo
              name="circle-with-cross"
              size={28}
              color="black"
              onPress={() => onClose()}
            />
          </Flex>
          <VStack>
            <Heading
              fontSize={18}
              fontWeight="semibold"
              color={Colors.lightBlack}
            >
              Select Color
            </Heading>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <HStack py={1.5} space={2}>
                {productData &&
                  productData.colorDetails.map((i, index) => (
                    <Pressable
                      key={index}
                      borderWidth={selectedColorIndex === index ? 4 : 0}
                      borderColor={
                        selectedColorIndex === index ? Colors.lightBlack : ""
                      }
                      rounded={selectedColorIndex === index ? 8 : 0}
                      onPress={() => handlePress(index)}
                    >
                      <Center>
                        <Image
                          alt="imgs"
                          w={20}
                          h={20}
                          resizeMode="contain"
                          rounded={8}
                          source={{
                            uri: `${api.API_URL}assets/img/${i.image_url[0].url}`,
                          }}
                        />
                      </Center>
                    </Pressable>
                  ))}
              </HStack>
            </ScrollView>
          </VStack>

          <Heading
            fontSize={18}
            fontWeight="semibold"
            color={formError ? Colors.red : Colors.lightBlack}
            mt={3}
          >
            Select Size
          </Heading>
          <HStack mt={2} space={2}>
            {sizes.map((i, index) => (
              <Center
                bg={Colors.white}
                key={index}
                shadow={4}
                borderWidth={selectedSize === i ? 2 : 0.5}
                borderColor={
                  selectedSize === i ? Colors.black : Colors.lightWhite
                }
                px={4}
                py={2}
                rounded={5}
              >
                <Pressable onPress={() => handleSizeChange(i, index)}>
                  <Box>
                    <Text fontSize={16} bold>
                      {i}
                    </Text>
                  </Box>
                </Pressable>
              </Center>
            ))}
          </HStack>

          <HStack space={2} mt={3}>
            <Text bold fontSize={21} color={Colors.green} id="totalPrice">
              ₹{price * quantity}
            </Text>
          </HStack>

          {isUser ? (
            <HStack space={2} mt={4}>
              {isInCart ? (
                <Button
                  w="50%"
                  rounded={0}
                  bg={Colors.skyblue}
                  _text={{ fontSize: "20px", fontWeight: "bold" }}
                  borderRadius="full"
                  onPress={() => navigation.navigate("Cart")}
                >
                  View Cart
                </Button>
              ) : (
                <Button
                  w="50%"
                  rounded={0}
                  bg={Colors.skyblue}
                  _text={{ fontSize: "20px", fontWeight: "bold" }}
                  borderRadius="full"
                  onPress={() => handleCart()}
                >
                  {addingCart ? <Spinner size="lg" /> : "Add to Cart"}
                </Button>
              )}
              <Center
                p={3}
                rounded="full"
                bg={Colors.white}
                borderColor={Colors.skyblue}
                borderWidth={2}
              >
                <AntDesign name="heart" size={24} color="red" />
              </Center>
            </HStack>
          ) : (
            <Button
              mt={4}
              _text={{ fontWeight: "semibold" }}
              onPress={() => navigation.navigate("Login")}
            >
              LOGIN TO BUY/ADD TO CART
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
