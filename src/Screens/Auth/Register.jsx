import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../Componentes/Colors";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  CheckUserExistance,
  SendOtp,
  userRegistration,
} from "../../Controller/User/UserController";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setUsername] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = {
    email,
    password,
    mobile,
    name,
  };

  const showPassWord = () => {
    setShowPass(!showPass);
  };

  const handleRegister = async () => {
    setLoading(true);
    if (name === "") {
      setFormError("username required");
      setLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Email invalid");
      setLoading(false);
      return;
    } else if (mobile.length < 10) {
      setFormError("Invalid Mobile");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setFormError("Password length shoud be 6 or more");
      setLoading(false);
      return;
    }
    setFormError("");
    try {
      const checkExistance = await CheckUserExistance(userData);
      if (checkExistance.status) {
        const otpSendFunction = await SendOtp(userData.email);
        if (otpSendFunction.status) {
          setLoading(false);
          setEmail("");
          setPassword("");
          setMobile("");
          setUsername("");
          navigation.navigate("OtpVerify", { userData });
          return;
        } else {
          setFormError("Otp sending failed");
        }
      } else {
        setFormError("User already exists");
        setLoading(false);
      }
    } catch (error) {
      setFormError(error.response.data.message || "Server error !");
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg={Colors.main}>
      <StatusBar style="dark" hidden={false} />
      <Image
        alt="imager"
        source={require("../../Assets/Images/register-screen-bg.jpg")}
        flex={1}
        resizeMode="cover"
        size="lg"
        w={400}
      />
      <Box
        w="full"
        h="full"
        position="absolute"
        top="0"
        right="0"
        px="6"
        justifyContent="center"
      >
        <Center w="full">
          <Image
            alt="signupimg"
            source={require("../../Assets/Images/signup.webp")}
            shadow={4}
            w="60%"
            h={40}
          />
        </Center>
        <VStack space={4}>
          <Text mt={2} color={Colors.red}>
            {formError}
          </Text>
          <Input
            variant="rounded"
            placeholder="username"
            pl={3}
            borderWidth={2}
            shadow={2}
            _focus={{
              bg: Colors.white,
            }}
            bg={Colors.white}
            borderColor={Colors.lightGreen}
            focusOutlineColor={Colors.lightGreen}
            fontSize={18}
            fontWeight="semibold"
            color={Colors.black}
            onChangeText={(value) => setUsername(value)}
            value={name}
          />
          <Input
            variant="rounded"
            placeholder="user@gmail.com"
            pl={3}
            borderWidth={2}
            shadow={2}
            _focus={{
              bg: Colors.white,
            }}
            bg={Colors.white}
            borderColor={Colors.lightGreen}
            focusOutlineColor={Colors.lightGreen}
            fontSize={18}
            fontWeight="semibold"
            color={Colors.black}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />

          <Input
            variant="rounded"
            placeholder="+91**********"
            pl={3}
            borderWidth={2}
            shadow={2}
            _focus={{
              bg: Colors.white,
            }}
            bg={Colors.white}
            borderColor={Colors.lightGreen}
            focusOutlineColor={Colors.lightGreen}
            fontSize={18}
            fontWeight="semibold"
            color={Colors.black}
            onChangeText={(value) => setMobile(value)}
            value={mobile}
          />

          <Input
            InputRightElement={
              <Entypo
                onPress={showPassWord}
                name="eye"
                size={24}
                color="black"
              />
            }
            variant="rounded"
            placeholder="******"
            type={showPass ? `text` : "password"}
            pl={3}
            borderWidth={2}
            shadow={2}
            _focus={{
              bg: Colors.white,
            }}
            bg={Colors.white}
            borderColor={Colors.lightGreen}
            focusOutlineColor={Colors.lightGreen}
            fontSize={18}
            fontWeight="semibold"
            color={Colors.black}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />

          <Button
            mt={10}
            rounded={50}
            bg={Colors.skyBlueLight}
            shadow={4}
            borderWidth={3}
            borderColor={Colors.white}
            _text={{
              color: Colors.black,
              fontSize: "16px",
              fontWeight: "bold",
            }}
            _pressed={{ bg: Colors.main2 }}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" color={Colors.black} /> : "SIGN-UP"}
          </Button>

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text color={Colors.black} textAlign="center">
              LOGIN !{" "}
            </Text>
          </Pressable>
        </VStack>
      </Box>
    </Box>
  );
}
