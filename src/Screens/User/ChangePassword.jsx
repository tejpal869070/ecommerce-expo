import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { Entypo } from "@expo/vector-icons";
import resetimg from "../../Assets/Images/reset_pass.png";
import { ChangeUserPassword } from "../../Controller/User/UserController";

export default function ChangePassword() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const openModal = () => {
    setModalVisible((previous) => !previous);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const showPassWord = () => {
    setShowPass(!showPass);
  };

  const formData = {
    oldPassword,
    newPassword,
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      if (oldPassword.length < 6) {
        setFormError("Please check old password !");
        return;
      } else if (newPassword.length < 6) {
        setFormError("Minimum password length is six.");
        return;
      } else if (newPassword !== confirmPassword) {
        setFormError("Password doesn't match");
        return;
      }
      setFormError("");

      const response = await ChangeUserPassword(formData);
      if (response.status === true) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setLoading(false);
        alert("Password changed successfully. You can login.");
        openModal();
      } else {
        setLoading(false);
        setFormError("Old Password is incorrect.");
      }
    } catch (error) {
      setLoading(false);
      setFormError("Server error !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Pressable onPress={() => openModal()}>
        <HStack
          bg={Colors.white}
          px={3}
          rounded={10}
          justifyContent="space-between"
          alignItems="center"
          py={3}
        >
          <HStack space={1.5}>
            <MaterialIcons name="security" size={24} color="black" />
            <Text fontSize={15} fontWeight="semibold">
              Change Password
            </Text>
          </HStack>
          <AntDesign name="right" size={16} color="black" />
        </HStack>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={openModal}
      >
        <Box
          flex={1}
          bg={Colors.lightGreen}
          justifyContent="center"
          alignItems="center"
        >
          <VStack rounded={20} px={4} w="92%" alignItems="center" space={6}>
            <Center>
              <Image alt="img" w={40} h={40} source={resetimg} />
            </Center>
            <Text color={Colors.red}>{formError}</Text>
            <Input
              InputLeftElement={
                <MaterialIcons name="security" size={24} color="black" />
              }
              InputRightElement={
                showPass ? (
                  <Entypo
                    onPress={showPassWord}
                    name="eye"
                    size={24}
                    color="black"
                  />
                ) : (
                  <Ionicons
                    name="eye-off"
                    size={24}
                    color="black"
                    onPress={showPassWord}
                  />
                )
              }
              variant="underlined"
              placeholder="Old Password"
              type={!showPass ? `password` : `text`}
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setOldPassword(value)}
              value={oldPassword}
            />
            <Input
              InputLeftElement={
                <MaterialIcons name="password" size={24} color="black" />
              }
              variant="underlined"
              placeholder="New Password"
              type={!showPass ? `password` : `text`}
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setNewPassword(value)}
              value={newPassword}
            />
            <Input
              InputLeftElement={
                <MaterialIcons name="password" size={24} color="black" />
              }
              variant="underlined"
              placeholder="Confirm Password"
              type={!showPass ? `password` : `text`}
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setConfirmPassword(value)}
              value={confirmPassword}
            />

            <Button
              w="100%"
              rounded="full"
              borderWidth={2}
              borderColor={Colors.white}
              shadow={4}
              _pressed={{
                bg: Colors.skyblue,
                borderColor: Colors.white,
                borderWidth: "2",
                color: Colors.main,
              }}
              bg={Colors.skyblue}
              _text={{
                fontWeight: "bold",
                fontSize: "18px",
                color: Colors.black,
              }}
              onPress={() => handleChangePassword()}
              disabled={loading}
            >
              {loading ? "Loading..." : "Change Password"}
            </Button>

            <Pressable onPress={openModal}>
              <Text>Close</Text>
            </Pressable>
          </VStack>
        </Box>
      </Modal>
    </Box>
  );
}
