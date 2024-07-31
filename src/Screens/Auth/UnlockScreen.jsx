import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Pressable,
  Text,
} from "native-base";
import { View, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import fingerimg from "../../Assets/Images/fingerprint-img.png";
import * as SecureStore from "expo-secure-store";

export default function UnlockScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [username, setUsername] = useState("");
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && enrolled);
    })();
  }, []);

  const authenticate = async () => {
    try {
      if (isBiometricSupported) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate",
          fallbackLabel: "Use PIN",
        });

        if (result.success) {
          navigation.navigate("Bottom");
        } else {
          Alert.alert("Authentication Failed", "Please enter your PIN.");
        }
      } else {
        Alert.alert(
          "Biometric Authentication Not Supported",
          "Please enter your PIN."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePinSubmit = () => {
    Alert.alert("PIN Submitted", `Your PIN is ${pin}`);
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("cartData");
    await SecureStore.deleteItemAsync("name");
    navigation.navigate("Login");
  };

  const getUser = async () => {
    const name = await SecureStore.getItemAsync("name");
    setUsername(name);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box flex={1} bg={Colors.lightGreen} safeAreaTop>
      <StatusBar hidden={false} style="dark" />

      <Center flex={1} bg={Colors.lightGreen}>
        <Heading>Hello {username}</Heading>
        <Text mb={10} mt={2}>
          Welcome back !
        </Text>
        <Pressable onPress={() => authenticate()}>
          <Image w={40} h={40} source={fingerimg} alt="Finger scanner" />
        </Pressable>
        <Button
          mt={20}
          rounded={10}
          _text={{
            fontSize: 18,
            fontWeight: "bold",
          }}
          bg={Colors.lightRed}
          px={6}
          onPress={() => handleLogout()}
        >
          LOGOUT
        </Button>
      </Center>
      {!isBiometricSupported && (
        <View style={{ marginTop: 20 }}>
          <Text>Enter PIN:</Text>
          <TextInput
            secureTextEntry
            value={pin}
            onChangeText={setPin}
            placeholder="Enter PIN"
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: 200,
              marginBottom: 10,
              padding: 5,
            }}
          />
          <Button title="Submit PIN" onPress={handlePinSubmit} />
        </View>
      )}
    </Box>
  );
}
