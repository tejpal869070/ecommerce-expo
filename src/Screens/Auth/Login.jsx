import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color"; 
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import { 
  SetCartDataToLocal,
  userLogin,
} from "../../Controller/User/UserController";
 
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const userData = {
    email,
    password,
  };

  const [showPass, setShowPass] = useState(false);

  const showPassWord = () => {
    setShowPass(!showPass);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Email invalid");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setFormError("Invalid password");
      setLoading(false);
      return;
    }
    setFormError("");
    try {
      const response = await userLogin(userData);

      await SecureStore.setItemAsync("token", response.token);
      await SecureStore.setItemAsync("email", response.email);
      SetCartDataToLocal();
      setEmail("");
      setPassword("");
      navigation.navigate("Bottom");
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFormError("Email or Password is wrong.");
        setLoading(false);
        return;
      }
      setFormError("Server error !");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg={Colors.main} position="relative">
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
            source={require("../../Assets/Images/loginimg.png")}
            shadow={2}
            w="80%"
            h={40}
          />
        </Center>
        <VStack space={4} mt={4}>
          <Text color={Colors.red} ml={2}>
            {formError}
          </Text>
          <Input
            variant="rounded"
            placeholder="Email"
            pl={3}
            fontSize={18}
            borderColor={Colors.lightGreen}
            borderWidth={2.5}
            focusOutlineColor={Colors.lightGreen}
            color={Colors.black}
            fontWeight="semibold"
            onChangeText={(value) => setEmail(value)}
            value={email}
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
            pl={4}
            fontSize={18}
            borderColor={Colors.lightGreen}
            borderWidth={2.5}
            focusOutlineColor={Colors.lightGreen}
            color={Colors.black}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />

          <Button
            onPress={handleLogin}
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
          >
            {loading ? <Spinner size="sm" /> : "LOGIN"}
          </Button>

          <HStack justifyContent="space-between" w="full">
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text fontSize={16} bold textAlign="center" color={Colors.black}>
                SignUp Now!
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
              <Text fontSize={16} bold textAlign="center" color={Colors.black}>
                Forgot Password.
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}
