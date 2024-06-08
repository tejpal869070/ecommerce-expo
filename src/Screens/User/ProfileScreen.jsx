import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "native-base";

import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import userIcon from "../../Assets/Images/user.png";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import {
  CheckToken,
  GetUserDetails,
} from "../../Controller/User/UserController";
import ChangePassword from "./ChangePassword";
import ShowAddress from "./ShowAddress";
import UserDetails from "./UserDetails";
import UserOrders from "./UserOrders";
import WishList from "./WishList";
import Help from "./Help";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [isUser, setIsUser] = useState(false);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("mobile");
    navigation.navigate("Login");
  };

  const getUserDetails = async () => {
    const response = await GetUserDetails();
    if (response.data.length < 1) {
      alert("Something went wrong.");
      setUserData({});
    } else {
      setUserData(response.data[0]);
      setLoading(false);
    }
  };

  // check user login
  const CheckUserLogin = async () => {
    const isLoggedIn = await CheckToken();
    if (isLoggedIn) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
      CheckUserLogin();
    }, [])
  );

  return (
    <Box>
      <Center bg={Colors.lightGreen} pt={10} pb={3}>
        <Text bold fontSize={20} color={Colors.green}>
          Profile
        </Text>
      </Center>
      <HStack alignItems="center" py={4}>
        <Box
          w={150}
          bg={Colors.skyblue}
          roundedRight="full"
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Image
            source={userIcon}
            w={24}
            h={24}
            rounded="full"
            alt="userIcons"
          />
        </Box>
        <Box px={4}>
          {isUser ? (
            <VStack>
              <Text fontSize={22} fontWeight="semibold">
                {userData.uname}
              </Text>
              <Text fontSize={14} fontWeight="medium">
                UID:{userData.uid}
              </Text>
            </VStack>
          ) : (
            <VStack>
              <Text fontSize={22} fontWeight="semibold">
                Welcome
              </Text>
              <Text fontSize={14} fontWeight="medium" color={Colors.skyblue}>
                Please login
              </Text>
            </VStack>
          )}
        </Box>
      </HStack>
      {isUser ? (
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          px={3}
          pt={4}
          justifyContent="space-between"
          bg={Colors.main2}
          alignContent="center"
          justifyItems="center"
        >
          <UserDetails userData={userData} />
          <UserOrders />
          <WishList />
          <Help />
        </Flex>
      ) : (
        ""
      )}

      {/* Button */}
      <VStack px={4} py={4} space={2.5}>
        {isUser ? (
          <VStack space={2.5}>
            <ChangePassword />
            <ShowAddress userData={userData} />
          </VStack>
        ) : (
          ""
        )}

        {/*logout*/}
        {isUser ? (
          <Button
            py={3}
            mt={6}
            bg={Colors.lightRed}
            rounded={10}
            _pressed={{ bg: Colors.black }}
            _text={{ fontWeight: "bold" }}
            w="full"
            onPress={handleLogout}
          >
            LOGOUT
          </Button>
        ) : (
          <Button
            py={3}
            mt={6}
            bg={Colors.main2}
            rounded="full"
            _pressed={{ bg: Colors.main }}
            _text={{ fontWeight: "bold", color: Colors.black }}
            w="full"
            borderWidth={3}
            borderColor={Colors.main}
            shadow={4}
            onPress={() => navigation.navigate("Login")}
          >
            LOGIN
          </Button>
        )}
      </VStack>

      {/*to show swype tabs remove BOX from parent*/}
      {/* <Tabs /> */}
    </Box>
  );
}
