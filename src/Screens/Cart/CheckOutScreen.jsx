import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Heading,
  Pressable,
  Image,
  ScrollView,
  Select,
  Button,
  Spinner,
} from "native-base";
import { Colors } from "../../color";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  GetCartDataByIds,
  GetUserDetails,
  PlaceOrder,
} from "../../Controller/User/UserController";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import AddAddress from "../../Componentes/User/AddAddress";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export default function CheckOutScreen() {
  const navigation = useNavigation();
  const params = useRoute();
  const { totalPrice } = params.params;
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [isAddressPopup, setIsAddressPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [userDetails, setUserData] = useState({});
  const [addressData, setAddress] = useState([]);
  const [items, setItems] = useState([]);

  const [ordring, setOrdring] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [cartProducts, setCartproducts] = useState([]);

  const changePaymentMethod = (index) => {
    setSelectedPayment(index);
  };

  const itemsPrice = totalPrice;
  const shippingPrice = (totalPrice * 5) / 100;
  const discountPrice = (totalPrice * 10) / 100;
  const totalBillAmount = totalPrice + shippingPrice - discountPrice;

  /*user details */

  const getUserDetails = async () => {
    const response = await GetUserDetails();
    if (response.data.length < 1) {
      alert("Something went wrong.");
      setUserData({});
    } else {
      setUserData(response.data[0]);
      setAddress(response.data[0].address);
      setLoading(false);
    }
  };

  const openAddressPopup = () => {
    setIsAddressPopup((previous) => !previous);
    getUserDetails();
  };

  const getCartData = async () => {
    try {
      const response = await GetCartDataByIds();
      if (response.status) {
        const arr = [];
        const cartDataFromLocal = await SecureStore.getItemAsync("cartData");
        if (cartDataFromLocal) {
          const cartData = JSON.parse(cartDataFromLocal);
          for (let i = 0; i < cartData.length; i++) {
            const singleData = response.data.find(
              (item) => item.cart_id === cartData[i].id
            );
            if (singleData) {
              const newObj = {
                product_id: singleData.product_id,
                size: singleData.size,
                qty: cartData[i].qty,
                color: singleData.color,
              };
              arr.push(newObj);
            }
          }
          setItems(arr);
        }
      } else {
        setCartproducts([]);
      }
    } catch (error) {
      setCartproducts([]);
    }
  };

  const formData = {
    payment_type: ShippingInputs[selectedPayment].type,
    address: addressData[selectedAddress],
    items: items,
  };

  const handleOrder = async () => {
    setOrdring(true);
    try {
      const response = await PlaceOrder(formData);
      if (response.status) {
        setOrderSuccess(true);
        setOrdring(false);
        await SecureStore.deleteItemAsync("cartData");
        navigation.navigate("OrderConfirm");
      } else {
        Alert.alert("Something Went Wrong.");
        setOrdring(false);
      }
    } catch (error) {
      Alert.alert("Some of your items are out of stock.");
      console.log("error", error);
      setOrdring(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
      getCartData();
    }, [])
  );

  return (
    <ScrollView
      bg={Colors.lightGreen}
      flex={1}
      px={1}
      pt={4}
      showsVerticalScrollIndicator={false}
    >
      <Box px={2}>
        <Heading fontSize={18}>Shipping Address</Heading>
        <HStack
          mt={2}
          py={4}
          px={4}
          bg={Colors.white}
          rounded={10}
          shadow={4}
          justifyContent="space-between"
        >
          {addressData && addressData.length === 0 ? (
            <Pressable onPress={() => openAddressPopup()}>
              <HStack justifyContent="center" alignItems="center" space={2}>
                <Text bold fontSize={17} color={Colors.main}>
                  Add Address
                </Text>
                <AntDesign name="pluscircleo" size={18} color="black" />
              </HStack>
            </Pressable>
          ) : (
            <HStack w="full">
              <VStack w="80%" space={0.5}>
                <Text bold fontSize={17} color={Colors.lightBlack}>
                  {addressData && addressData[selectedAddress].name}
                </Text>
                <Text fontWeight="semibold" color={Colors.lightBlack}>
                  M.No.: {addressData && addressData[selectedAddress].phone}
                </Text>
                <Text fontWeight="semibold" color={Colors.lightBlack}>
                  {addressData &&
                    `${addressData[selectedAddress].street} 
                      ${addressData[selectedAddress].city} 
                      ${addressData[selectedAddress].state} 
                      ${addressData[selectedAddress].country} 
                      ${addressData[selectedAddress].pincode}`}
                </Text>
              </VStack>
              <Select
                rounded="full"
                placeholder="Change"
                borderWidth={0}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedAddress(itemValue);
                }}
                _selectedItem={{
                  bg: Colors.lightGreen,
                }}
              >
                {addressData.map((item, index) => (
                  <Select.Item
                    value={index}
                    label={`${item.name}${" "}${item.street}${" "}${
                      item.city
                    }${" "}${item.state}${" "}${item.country}${" "}${
                      item.pincode
                    }`}
                    key={index}
                  />
                ))}
              </Select>
            </HStack>
          )}
        </HStack>
        {addressData.length !== 0 && (
          <Pressable pt={1} onPress={() => openAddressPopup()}>
            <Text bold textAlign="right" color={Colors.main}>
              + Add New
            </Text>
          </Pressable>
        )}

        {/*Payment Method */}
        <Heading fontSize={18} mt={6}>
          Payment Method
        </Heading>
        <Box mt={2} bg={Colors.white} rounded={10} shadow={1}>
          {ShippingInputs.map((item, index) => (
            <Pressable key={index} onPress={() => changePaymentMethod(index)}>
              <HStack
                alignItems="center"
                px={3}
                justifyContent="space-between"
                py={1}
              >
                <Box>
                  <Image
                    source={item.image}
                    h={12}
                    w={20}
                    alt={item.alt}
                    resizeMode="contain"
                  />
                </Box>
                {selectedPayment === index ? (
                  <AntDesign name="checkcircle" size={24} color="green" />
                ) : (
                  <Entypo name="circle" size={24} color="black" />
                )}
              </HStack>
            </Pressable>
          ))}
        </Box>

        {/*Payment detail */}
        <VStack
          px={4}
          py={4}
          bg={Colors.white}
          mt={6}
          rounded={10}
          shadow={1}
          space={3}
        >
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              Items
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              ₹{itemsPrice}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              Shipping
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              + ₹{shippingPrice.toFixed(0)}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              Discount
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              - ₹{discountPrice.toFixed(0)}
            </Text>
          </HStack>
          <HStack
            justifyContent="space-between"
            borderTopWidth={0.5}
            borderTopColor={Colors.black}
            pt={1}
          >
            <Text fontSize={18} bold color={Colors.green}>
              Total Bill
            </Text>
            <Text fontSize={18} bold color={Colors.green}>
              ₹{totalBillAmount.toFixed(0)}
            </Text>
          </HStack>
        </VStack>

        <Box mt={6}>
          <Button
            rounded="full"
            _text={{
              color: Colors.white,
              fontWeight: "bold",
              fontSize: "18px",
            }}
            h={12}
            bg={Colors.main}
            fontSize={18}
            bold
            color={Colors.green}
            onPress={() => handleOrder()}
          >
            {ordring ? <Spinner color={Colors.white} size="sm" /> : "ORDER NOW"}
          </Button>
        </Box>
      </Box>

      <Box h={10} w="full" />

      {isAddressPopup && (
        <AddAddress
          newAddressPopup={isAddressPopup}
          openAddNewPopup={openAddressPopup}
        />
      )}
    </ScrollView>
  );
}

const ShippingInputs = [
  {
    image: require("../../Assets/Images/cod.png"),
    alt: "Cod",
    type: "COD",
  },
  {
    image: require("../../Assets/Images/upi.png"),
    alt: "upi",
    type: "UPI",
  },
  {
    image: require("../../Assets/Images/visa.png"),
    alt: "visa",
    type: "CARD",
  },
  {
    image: require("../../Assets/Images/paytm.png"),
    alt: "visa",
    type: "PAYTM",
  },
];
