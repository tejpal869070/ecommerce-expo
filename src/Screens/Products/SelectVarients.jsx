import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Image,
  Pressable,
  Select,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Modal, ScrollView } from "react-native";
import { Colors } from "../../color";
import { api } from "../../Config/api";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import InputSpinner from "react-native-input-spinner";
import { AddtoCart, CheckToken } from "../../Controller/User/UserController";
import CheckOut from "../Orders/CheckOut";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function SelectVarients({ visible, onClose, productData }) {
  console.log("prodData", productData);
  const navigation = useNavigation();
  const toast = useToast();
  const [formError, setFormError] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedSizeQty, setSelectedSizeQty] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const [quantity, setQuantity] = useState(1);
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

  const handleSizeChange = (selectedSizeIndex, itemIndex) => {
    console.log(selectedSizeIndex);
    setSelectedSizeQty(sizes.indexOf(selectedSizeIndex));
    setSelectedSize(selectedSizeIndex);
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
    if (formData.size === undefined) {
      setFormError(true);
      return;
    }
    setFormError(false);
    try {
      const response = await AddtoCart(formData);
      console.log(response);
      if (response.status) {
        toast.closeAll();
        setAdded(true);
        toast.show({ title: "Added", placement: "top" });
      }
    } catch (error) {
      console.log("eror", error);
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
          h="60%"
          textAlign="center"
        >
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
                      rounded={selectedColorIndex === index ? 8 : 0}
                      onPress={() => handlePress(index)}
                    >
                      <Center>
                        <Image
                          alt="imgs"
                          w={20}
                          h={20}
                          resizeMode="contain"
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
          <HStack>
            <VStack mt={4} w="50%">
              <Heading
                fontSize={18}
                fontWeight="semibold"
                color={formError ? Colors.red : Colors.lightBlack}
              >
                Select Size
              </Heading>
              <FormControl w="3/4" maxW="300">
                <Select
                  width={150}
                  h={10}
                  rounded="full"
                  shadow={4}
                  accessibilityLabel="Choose Service"
                  borderColor={formError ? Colors.red : Colors.lightBlack}
                  onValueChange={(itemValue, itemIndex) =>
                    handleSizeChange(itemValue, itemIndex)
                  }
                  placeholder="Sizes"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: (
                      <AntDesign name="checkcircleo" size={24} color="black" />
                    ),
                  }}
                  mt="1"
                >
                  {sizes.map((i, index) => (
                    <Select.Item
                      label={`${i} ${
                        sizesAvailable[index] === 1
                          ? "Out of Stock"
                          : "     In Stock "
                      }`}
                      value={i}
                      key={index}
                      style={{
                        color:
                          sizesAvailable[index] === 1
                            ? Colors.red
                            : Colors.black,
                      }}
                      disabled={sizesAvailable[index] === 1}
                    />
                  ))}
                </Select>
              </FormControl>
            </VStack>
            <VStack mt={4} w="45%">
              <Heading
                fontSize={18}
                fontWeight="semibold"
                color={Colors.lightBlack}
                mb={1}
              >
                Quantity
              </Heading>
              <InputSpinner
                max={sizesAvailable[selectedSizeQty]}
                min={1}
                step={1}
                height={40}
                onChange={(num) => setQuantity(num)}
                initialValue={1}
                width={150}
                buttonFontSize={19}
                colorMax={"#f04048"}
                colorMin={"#40c5f4"}
                skin="round"
              />
            </VStack>
          </HStack>

          <HStack space={2} mt={2}>
            <Text bold fontSize={18} color={Colors.green} id="totalPrice">
              ₹{price * quantity}
            </Text>
          </HStack>

          {isUser ? (
            <HStack justifyContent="space-between" mt={4}>
              <Button
                w="50%"
                rounded={0}
                bg={Colors.skyblue}
                _text={{ fontSize: "18px", fontWeight: "bold" }}
                borderLeftRadius={18}
                shadow={4}
                onPress={() => handleCart()}
              >
                {added ? (
                  <HStack space={1} alignItems="center">
                    <Text fontSize="17px" bold>
                      Added
                    </Text>
                    <MaterialIcons name="verified" size={16} color="black" />
                  </HStack>
                ) : (
                  "Add to Cart"
                )}
              </Button>
              <CheckOut
                totalPrice={price * quantity}
                buy={true}
                buyData={formData}
              />
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

          <Button mt={10} w={20} rounded="full" onPress={() => onClose()}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
