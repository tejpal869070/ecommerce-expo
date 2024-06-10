import {
    Box,
    Center,
    HStack,
    Image,
    ScrollView,
    Text,
    VStack,
  } from "native-base";
  import React from "react";
  import { Modal, Pressable } from "react-native";
  import { Colors } from "../../color";
  import img1 from "../../Assets/Images/cat5.png"
  import { FontAwesome, AntDesign } from "@expo/vector-icons";
  
  
  export default function SingleOrderDetail({ isVisible, openModel2 }) {
   
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={openModel2}
      >
        <Box showsVerticalScrollIndicator={false} flex={1} bg={Colors.lightWhite}>
          <HStack
            alignItems="center"
            w="full"
            py={3.5}
            bg={Colors.main}
            space={4}
            px={2}
          >
            <AntDesign
              onPress={() => openModel2()}
              name="arrowleft"
              size={24}
              color="white"
            />
            <Text bold fontSize={20} color={Colors.white}>
              Order Details
            </Text>
          </HStack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Box
              py={2}
              px={3}
              borderBottomWidth={0.5}
              borderBottomColor={Colors.lightBlack}
            >
              <Text color={Colors.lightBlack}>Order ID:- OD4551ECD4100</Text>
            </Box>
            <HStack
              w="full"
              py={5}
              px={3}
              borderBottomWidth={0.5}
              borderBottomColor={Colors.lightBlack}
            >
              <VStack w="75%" space={1.5}>
                <Text fontSize={16} fontWeight="semibold">
                  Chakki fresh aata with fiber and natural ingeridients.
                </Text>
                <Text bold color={Colors.green} fontSize={20}>
                  Rs.330
                </Text>
              </VStack>
              <Center w="25%">
                <Image alt="img" w={20} h={20} source={img1} />
              </Center>
            </HStack>
  
            {/*delivery details*/}
            <VStack py={4} px={4} space={3}>
              <HStack space={4}>
                <FontAwesome name="check-circle" size={20} color="green" />
                <Text color={Colors.lightBlack}>Ordered On 25-04-2024</Text>
              </HStack>
              <HStack space={4}>
                <FontAwesome name="check-circle" size={20} color="green" />
                <Text color={Colors.lightBlack}>Delivered On 30-04-2024</Text>
              </HStack>
            </VStack>
  
            {/*invoice details*/}
            <Pressable >
              <HStack
                justifyContent="space-between"
                alignItems="center"
                bg={Colors.white}
                px={3}
                mx={1}
                rounded={5}
                mb={2}
                py={3}
                shadow={4}
              >
                <HStack space={2}>
                  <AntDesign name="filetext1" size={24} color="black" />
                  <Text fontSize={16}>Download Invoice</Text>
                </HStack>
                <AntDesign name="right" size={18} color="black" />
              </HStack>
            </Pressable>
  
            {/*Shipping details*/}
            <VStack
              pb={4}
              space={3}
              mx={1}
              rounded={5}
              bg={Colors.white}
              shadow={2}
            >
              <Text
                px={3}
                py={2}
                borderBottomWidth={0.5}
                borderBottomColor={Colors.lightBlack}
                color={Colors.lightBlack}
              >
                Shipping Details
              </Text>
              <VStack px={3}>
                <Text fontWeight="semibold" fontSize={20}>
                  Tarun Soni
                </Text>
                <Text>Plot 4 , Schooler school</Text>
                <Text>Jodhpur</Text>
                <Text>Rajasthan - 302029</Text>
                <Text>Phone number: 869078302</Text>
              </VStack>
            </VStack>
  
            {/*Price details*/}
            <VStack
              pb={4}
              space={3}
              mx={1}
              rounded={5}
              bg={Colors.white}
              shadow={2}
              mt={2}
            >
              <Text
                px={3}
                py={2}
                borderBottomWidth={0.5}
                borderBottomColor={Colors.lightBlack}
                color={Colors.lightBlack}
              >
                Price Details
              </Text>
              <VStack px={3} space={3}>
                <HStack justifyContent="space-between">
                  <Text>Regular Price</Text>
                  <Text>₹349</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text>Selling Price</Text>
                  <Text>₹310</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text>Extra Discount</Text>
                  <Text color={Colors.green}>-₹20</Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text>Delivery Charges</Text>
                  <Text>₹40</Text>
                </HStack>
                <HStack
                  justifyContent="space-between"
                  borderStyle="dotted"
                  borderTopWidth={1}
                >
                  <Text fontSize={16} fontWeight="semibold">
                    Total Amount
                  </Text>
                  <Text fontSize={16} fontWeight="semibold" color={Colors.green}>
                    ₹330
                  </Text>
                </HStack>
              </VStack>
            </VStack>
  
            {/*payment type*/}
            <Box
              px={3}
              py={2}
              bg={Colors.white}
              mx={1}
              rounded={5}
              shadow={4}
              mt={1}
            >
              <Text>Paid via UPI: 8690708302@upi</Text>
            </Box>
            <Box h={10} w="full"></Box>
          </ScrollView>
        </Box>
      </Modal>
    );
  }
  