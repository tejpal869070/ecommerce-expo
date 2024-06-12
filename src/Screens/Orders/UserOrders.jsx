import { Box, HStack, Image, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Modal, Pressable } from "react-native";
import { api } from "../../Config/api";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import SingleOrderDetail from "./SingleOrderDetail";
import { GetUserOrders } from "../../Controller/User/UserController";

export default function UserOrders() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  

  return (
    <Box w="47%">
      <Pressable onPress={() => navigation.navigate('Orders')}>
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
    </Box>
  );
}
