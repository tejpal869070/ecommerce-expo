import {
  Box,
  Button,
  Heading,
  Input,
  Pressable,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { StatusBar } from "expo-status-bar";
import {
  ForgetPassword,
  OtpVerification,
  SendOtp,
} from "../../Controller/User/UserController";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [optSending, setOptSending] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState("");

  const formData = {
    email: email,
    otp: otp,
  };

  const formData2 = {
    email: email,
    password: newPassword,
    token: token,
  };

  const handleOtpVerify = async () => {
    setOtpVerifying(true);
    if (email.length < 12) {
      setError("Invalid Email");
      setOtpVerifying(false);
      return;
    } else if (otp.length !== 4) {
      setError("Invalid OTP");
      setOtpVerifying(false);
      return;
    }
    setError("");
    try {
      const response = await OtpVerification(formData);
      if (response.status) {
        setOtpVerified(true);
        setOtpVerifying(false);
        setToken(response.token);
      } else {
        setError(response.msg);
        setOtpVerifying(false);
      }
    } catch (error) {
      setError("Something Went Wrong.");
      setOtpVerifying(false);
    }
  };

  const handleOtpSend = async () => {
    setOptSending(true);
    if (email.length < 12) {
      setError("Invalid Email");
      setOptSending(false);
      return;
    }
    try {
      const response = await SendOtp(email);
      if (response.status) {
        setOptSending(false);
        setOtpSent(true);
        setTimeout(() => {  
          setOtpSent(false);
        }, 1500); 
      } else {
        setOptSending(false);
        Alert.alert("Something Went Wrong.");
      }
    } catch (error) {
      setOptSending(false);
      Alert.alert("Something Went Wrong.");
    }
  };

  const handleResetPassword = async () => { 
    setResetting(true);
    if (newPassword.length < 6) {
      setResetError("Password must be at least 6 characters long.");
      setResetting(false);
      return;
    } else if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match");
      setResetting(false);
      return;
    }
    setResetError("");
    try {
      const response = await ForgetPassword(formData2);
      if (response.status) {
        setResetting(false);
        Alert.alert(
          "Success",
          "Password Reset Successfully..",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ],
          { cancelable: false }
        );
      } else {
        setResetError(response.message);
        setResetting(false);
      }
    } catch (error) {
      setResetError("Something Went Wrong.");
      setResetting(false);
    }
  };

  return (
    <Box flex={1} bg={Colors.lightGreen} safeAreaTop px={4} pt={4}>
      <StatusBar style="dark" hidden={false} />
      <Heading>Forget Password.</Heading>
      {!otpVerified ? (
        <VStack mt={10}>
          {error && (
            <Text bold color={Colors.red}>
              {error}
            </Text>
          )}
          <Input
            variant="rounded"
            placeholder="Enter Email"
            pl={3}
            mt={2}
            fontSize={18}
            borderColor={Colors.lightBlack}
            borderWidth={2}
            focusOutlineColor={Colors.black}
            color={Colors.black}
            fontWeight="semibold"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <Pressable onPress={() => handleOtpSend()}>
            {otpSent ? (
              <Text
                bold
                fontSize={18}
                color={Colors.green}
                textAlign="right"
                mt={1}
                italic
              >
                OTP Sent
              </Text>
            ) : (
              <Text
                bold
                fontSize={18}
                color={Colors.green}
                textAlign="right"
                mt={1}
              >
                {optSending ? "Sending..." : "Send OTP."}
              </Text>
            )}
          </Pressable>
          <Input
            variant="rounded"
            placeholder="Enter OTP"
            pl={3}
            mt={4}
            fontSize={18}
            borderColor={Colors.lightBlack}
            borderWidth={2}
            focusOutlineColor={Colors.black}
            color={Colors.black}
            fontWeight="semibold"
            onChangeText={(value) => setOtp(value)}
            value={otp}
            type="number"
          />
          <Button
            rounded="full"
            bg={Colors.green}
            mt={4}
            _text={{ fontWeight: "bold", fontSize: "18px" }}
            _pressed={{ bg: Colors.green }}
            onPress={() => handleOtpVerify()}
          >
            {otpVerifying ? (
              <Spinner size="sm" color={Colors.white} />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </VStack>
      ) : (
        <VStack mt={10}>
          {resetError && (
            <Text bold color={Colors.red}>
              {resetError}
            </Text>
          )}
          <Input
            variant="rounded"
            placeholder="Enter New Password"
            pl={3}
            mt={2}
            fontSize={18}
            borderColor={Colors.lightBlack}
            borderWidth={2}
            focusOutlineColor={Colors.black}
            color={Colors.black}
            fontWeight="semibold"
            onChangeText={(value) => setNewPassword(value)}
            value={newPassword}
            secureTextEntry={true}
          />
          <Input
            variant="rounded"
            placeholder="Confirm New Password"
            pl={3}
            mt={4}
            fontSize={18}
            borderColor={Colors.lightBlack}
            borderWidth={2}
            focusOutlineColor={Colors.black}
            color={Colors.black}
            fontWeight="semibold"
            onChangeText={(value) => setConfirmPassword(value)}
            value={confirmPassword}
            secureTextEntry={true}
          />
          <Button
            rounded="full"
            bg={Colors.green}
            mt={4}
            _text={{ fontWeight: "bold", fontSize: "18px" }}
            _pressed={{ bg: Colors.green }}
            onPress={() => handleResetPassword()}
          >
            {resetting ? (
              <Spinner size="sm" color={Colors.white} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </VStack> 
      )}
    </Box>
  );
}
