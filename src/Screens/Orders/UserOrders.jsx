import {
  Box, 
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Modal, Pressable } from "react-native";
import { OrdersData } from "../../Assets/Data/UserData";
import { useNavigation } from "@react-navigation/native"; 
import SingleOrderDetail from "./SingleOrderDetail";

export default function UserOrders() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => {
    setModalVisible((previous) => !previous);
  };

  const openModal2 = () => {
    setIsVisible((previous) => !previous);
  };

  return (
    <Box w="47%">
      <Pressable onPress={() => openModal()}>
        <HStack
          w="100%"
          bg={Colors.white}
          mb={4}
          py={3}
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          space={2}
          rounded="full"
          shadow={4}
        >
          <Feather name="box" size={24} color="black" />
          <Text bold fontSize={16}>
            Orders
          </Text>
        </HStack>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={openModal}
      >
        <Box flex={1} bg={Colors.lightGreen}>
          <HStack
            alignItems="center"
            w="full"
            py={3.5}
            bg={Colors.main}
            space={4}
            px={2}
          >
            <AntDesign
              onPress={() => openModal()}
              name="arrowleft"
              size={24}
              color="white"
            />
            <Text bold fontSize={20} color={Colors.white}>
              Orders
            </Text>
          </HStack>
          <ScrollView w="full" px={1} showsVerticalScrollIndicator={false}>
            {OrdersData.map((i, index) => (
              <Pressable key={index} onPress={() => openModal2()}>
                <HStack
                  bg={Colors.white}
                  py={3}
                  borderBottomWidth={1}
                  borderBottomColor={Colors.lightBlack}
                >
                  <Box w="25%">
                    <Image w={20} h={20} alt="product" source={i.image} />
                  </Box>
                  <Box w="75%" px={2} py={2}>
                    <VStack space={1}>
                      <Text isTruncated fontWeight="semibold" fontSize={17}>
                        {i.title}
                      </Text>
                      <Text color={Colors.lightBlack}>
                        Delivered on {i.recive_data}
                      </Text>
                    </VStack>
                  </Box>
                </HStack>
              </Pressable>
            ))}
          </ScrollView>
        </Box>
      </Modal>

      {/*single order model */}
       <SingleOrderDetail isVisible={isVisible} openModel2={openModal2} /> 
    </Box>
  );
}
