import { Box, Button, HStack, Text, VStack } from "native-base";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../color";
import { Modal, Pressable } from "react-native";

export default function UserDetails({ userData }) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible((previous) => !previous);
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
          <FontAwesome name="user-o" size={24} color="black" />
          <Text bold fontSize={16}>
            Details
          </Text>
        </HStack>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={openModal}
      >
        <Box flex={1} bg={Colors.lightGreen} pt={12} px={6}>
          <VStack space={4}>
            <HStack
              justifyContent="space-between"
              borderBottomColor={Colors.main}
              borderBottomWidth={1}
              pb={2}
            >
              <Text
                fontSize={18}
                color={Colors.lightBlack}
                fontWeight="semibold"
              >
                Name :
              </Text>
              <Text fontSize={20} fontWeight="bold">
                {userData.uname}
              </Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              borderBottomColor={Colors.main}
              borderBottomWidth={1}
              pb={2}
            >
              <Text
                fontSize={18}
                color={Colors.lightBlack}
                fontWeight="semibold"
              >
                Email :
              </Text>
              <Text fontSize={20} fontWeight="bold">
                {userData.email}
              </Text>
            </HStack>
            <HStack
              justifyContent="space-between"
              borderBottomColor={Colors.main}
              borderBottomWidth={1}
              pb={2}
            >
              <Text
                fontSize={18}
                color={Colors.lightBlack}
                fontWeight="semibold"
              >
                Mobile :
              </Text>
              <Text fontSize={20} fontWeight="bold">
                {userData.mobile}
              </Text>
            </HStack> 

            <Button
              mt={6}
              rounded="full"
              py={2}
              bg={Colors.skyblue}
              borderWidth={2}
              borderColor={Colors.main}
              _text={{
                color: Colors.white,
                fontSize: 20,
                fontWeight: "bold",
              }}
              onPress={() => openModal()}
            >
              Close
            </Button>
          </VStack>
        </Box>
      </Modal>
    </Box>
  );
}
