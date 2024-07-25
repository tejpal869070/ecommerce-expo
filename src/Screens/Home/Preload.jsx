import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { Colors } from "../../color";
import { StatusBar } from "expo-status-bar";
import bg1 from "../../Assets/Images/design/bg1.jpg";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function Preload() {
  const navigation = useNavigation();
  return (
    <Box flex={1} bg={Colors.lightGreen}>
      <StatusBar hidden={false} />
      <Box flex={1} h="screen" bg={Colors.lightGreen}>
        <Image source={bg1} alt="bg" resizeMode="cover" />
        <Box px={2} py={2}>
          <Heading>Welcome !</Heading>
          <HStack w="full" justifyContent="space-between" mt={2}>
            <Button
              w="49%"
              borderWidth={1}
              bg={Colors.skyblue}
              borderColor={Colors.lightWhite }
              borderBottomLeftRadius={16}
              borderTopRightRadius={16}
              h={12}
              _text={{
                fontWeight: "bold",
                fontSize: "18px",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              LOGIN
            </Button>
            <Button
              w="49%"
              _pressed={{ bg: Colors.main }}
              borderWidth={1}
              bg={Colors.skyblue}
              borderColor={Colors.lightWhite }
              borderBottomLeftRadius={16}
              borderTopRightRadius={16}
              h={12}
              _text={{
                fontWeight: "bold",
                fontSize: "18px",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              SIGN-UP
            </Button>
          </HStack>
          <Pressable onPress={() => navigation.navigate("Bottom")}>
            <HStack mt={4} alignItems="center" alignContent="center">
              <Text bold fontSize={16} color={Colors.lightBlack}>
                Explore Products{" "}
                <Feather name="arrow-right-circle" size={16} color="black" />
              </Text>
            </HStack>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
