import {
  Box,
  Button,
  Center,
  Image,
  Pressable,
  Spinner,
  Text,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../Componentes/Colors";
import { StatusBar } from "expo-status-bar";
import verifyimg from "../../Assets/Images/otpverify.png";
import OTPTextInput from "react-native-otp-textinput";
import {
  OtpVerification,
  SendOtp,
  userRegistration,
} from "../../Controller/User/UserController";
import { useRoute } from "@react-navigation/native";
import { Alert } from "react-native";

export default function VerifyOtp({ navigation }) {
  const params = useRoute();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setVerifying] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  let userData = null;

  if (params.params && params.params.userData) {
    userData = params.params.userData;
  }

  const handleOTPChange = (otp) => {
    setOtp(otp);
  };

  const formData = {
    otp: otp,
    email: userData.email,
  };

  const sendOtpAgain = async () => {
    setOtpSending(true);
    try {
      const response = await SendOtp(userData.email);
      if (response.status) {
        setOtpSending(false);
        setOtpSent(true);
        setTimeout(() => {
          setOtpSent(false);
        }, 2000);
        return;
      }
    } catch (error) {
      setError("Error in sending OTP");
      setOtpSending(false);
    }
  };

  const handleVerifyOTP = async () => {
    setVerifying(true);
    if (otp.length !== 4) {
      setError("Please enter valid OTP");
      setVerifying(false);
      return;
    }
    try {
      const response = await OtpVerification(formData);
      if (response.status) {
        userData.token = response.token;
        try {
          const registerResponse = await userRegistration(userData);
          if (registerResponse.status === true) {
            setError("");
            setVerifying(false);
            this.otpInput.clear();
            Alert.alert(
              "Account Created Successfully",
              "",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Login");
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            setError("Something went wrong");
            setVerifying(false);
          }
        } catch (error) {
          setError("Something went wrong");
          setVerifying(false);
        }
      } else {
        setError("Invalid OTP");
        setVerifying(false);
      }
    } catch (error) {
      setError("Internal server error!");
      setVerifying(false);
    }
  };

  return (
    <Box flex={1} bg={Colors.lightGreen} safeAreaTop>
      <StatusBar style="dark" hidden={false} />
      <Center mt={16}>
        <Image alt="verifyimg" w={150} h={150} source={verifyimg} />
        <Text mt={2}>OTP sent at your email.</Text>
        <Text mt={4} color={Colors.red}>
          {error}
        </Text>
        <OTPTextInput
          containerStyle={{ marginTop: 10 }}
          textInputStyle={{ backgroundColor: "white", width: "15%" }}
          handleTextChange={handleOTPChange}
          inputCount={4}
          ref={(e) => (this.otpInput = e)}
          keyboardType="numeric"
        />
        <Pressable
          mb={10}
          w="70%"
          mt={2}
          bg={Colors.lightGreen}
          onPress={() => sendOtpAgain()}
        >
          <Text textAlign="left" bold>
            {otpSending ? (
              <Spinner size="sm" />
            ) : isOtpSent ? (
              "OTP sent"
            ) : (
              "Resend OTP"
            )}
          </Text>
        </Pressable>
        <Button
          w={40}
          rounded={10}
          bg={Colors.main}
          _text={{ fontWeight: "bold", fontSize: "lg" }}
          title="Verify OTP"
          onPress={() => handleVerifyOTP()}
          _pressed={{ bg: Colors.skyblue }}
        >
          {isVerifying ? <Spinner size="sm" color={Colors.white} /> : "SUBMIT"}
        </Button>
      </Center>
    </Box>
  );
}
