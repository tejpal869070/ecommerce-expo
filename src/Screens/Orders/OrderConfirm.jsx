import { Box, Button, Center, Image, Text } from "native-base";
import React, { useEffect } from "react";
import { Colors } from "../../color";
import { StatusBar } from "expo-status-bar";
import gif1 from "../../Assets/Images/verified.gif";
import { BackHandler } from "react-native";

export default function OrderConfirm({ navigation }) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("Bottom");
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <Box flex={1} safeAreaTop bg={Colors.lightWhite}>
      <StatusBar style="dark" hidden={false} />
      <Center h="full" w="full">
        <Image
          alt="verified"
          w={40}
          h={40}
          source={gif1}
          resizeMode="contain"
        />
        <Text mt={4} fontSize={24} fontWeight="bold" color={Colors.green}>
          Order Confirmed!
        </Text>
        <Text px={6} mt={4} fontSize={16} color={Colors.lightBlack}>
          Your order has been confirmed. We will deliver your order soon.
        </Text>
        <Button
          mt={10}
          w="80%"
          bg={Colors.main}
          shadow={6}      
          _pressed={{ bg: Colors.main }}
          borderWidth={3}
          borderColor={Colors.white}
          rounded="full"
          py={3.5}
          _text={{ color: Colors.white, fontWeight: "black", fontSize: "18px" }}
          mx={6}
          onPress={() => navigation.navigate("Bottom")}
        >
          Home
        </Button>
      </Center>
    </Box>
  );
}
