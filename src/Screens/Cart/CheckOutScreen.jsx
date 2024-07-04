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
} from "native-base";
import { Colors } from "../../color";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { GetUserDetails } from "../../Controller/User/UserController";
import { useFocusEffect } from "@react-navigation/native";
import AddAddress from "../../Componentes/User/AddAddress";

export default function CheckOutScreen() {
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [isAddressPopup, setIsAddressPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [userDetails, setUserData] = useState({});
  const [addressData, setAddress] = useState([]);

  const changePaymentMethod = (index) => {
    setSelectedPayment(index);

  };

   

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

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
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
          {addressData.length === 0 ? (
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
                  {addressData && addressData[selectedAddress].street}{" "}
                  {addressData && addressData[selectedAddress].city}{" "}
                  {addressData && addressData[selectedAddress].state}{" "}
                  {addressData && addressData[selectedAddress].country}{" "}
                  {addressData && addressData[selectedAddress].pincode}{" "}
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
              Items(1)
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              ₹1000
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              Shipping
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              +₹40
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              Discount
            </Text>
            <Text fontWeight="semibold" color={Colors.lightBlack}>
              -₹20
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
              ₹1020
            </Text>
          </HStack>
        </VStack>

        <Box mt={6}>
          <Button rounded="full" _text={{
            color: Colors.white,
            fontWeight:"bold",
            fontSize:"18px"
          }} h={12} bg={Colors.main} fontSize={18} bold color={Colors.green}>ORDER</Button>
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
    type:"COD"
  },
  {
    image: require("../../Assets/Images/upi.png"),
    alt: "upi",
    type:"UPI"
  },
  {
    image: require("../../Assets/Images/visa.png"),
    alt: "visa",
    type:"CARD"
  },
  {
    image: require("../../Assets/Images/paytm.png"),
    alt: "visa",
    type:"PAYTM"
  },
];
