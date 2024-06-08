import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  Image,
} from "native-base";
import React, { useState } from "react";
import { Colors } from "../../color";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { UpdateUserDetails } from "../../Controller/User/UserController";

export default function ShowAddress({ userData }) {
  console.log("user", userData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddressPopup, setNewPopup] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const addresses = userData.address;

  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const fullAddress = {
    name,
    street,
    city,
    state,
    pincode,
    country,
    phone,
  };

  const openModal = () => {
    setModalVisible((previous) => !previous);
  };

  const openAddNewPopup = () => {
    setNewPopup((previous) => !previous);
  };

  const handleNewAddress = async () => {
    setLoading(true);
    if (name.length < 4) {
      setFormError("Name should be at least 4 characters");
      setLoading(false);
      return;
    } else if (phone.length < 10) {
      setFormError("Phone number should be at least 10 digits");
      setLoading(false);
      return;
    } else if (street.length < 15) {
      setFormError("Street should be at least 15 characters");
      setLoading(false);
      return;
    } else if (pincode.length < 6) {
      setFormError("Enter a valid pincode.");
      setLoading(false);
      return;
    } else if (city.length < 3) {
      setFormError("Enter a valid city");
      setLoading(false);
      return;
    } else if (state.length < 3) {
      setFormError("Enter a valid state");
      setLoading(false);
      return;
    } else if (country.length < 3) {
      setFormError("Enter a valid country.");
      setLoading(false);
      return;
    }

    try {
      const response = await UpdateUserDetails(fullAddress);
      if (response.status) {
        setLoading("");
        setFormError("");
        setName("");
        setPhone("");
        setStreet("");
        setPincode("");
        setCity("");
        setState("");
        setCountry("");

        openAddNewPopup();
      }
    } catch (error) {
      console.log(error);
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
            <FontAwesome6 name="address-card" size={20} color="black" />
            <Text fontSize={15} fontWeight="semibold">
              Address Book
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
        <Box flex={1} bg={Colors.lightGreen}>
          {addresses && addresses.length < 1 ? (
            <Center h={200} w="full">
              <Text bold fontSize={18}>
                Add Address
              </Text>
            </Center>
          ) : (
            <ScrollView py={6} px={4}>
              {addresses &&
                addresses.map((i, index) => (
                  <Box
                    bg={Colors.white}
                    rounded={10}
                    px={4}
                    py={4}
                    key={index}
                    mb={4}
                    shadow={2}
                  >
                    <VStack>
                      <Text bold fontSize={20} mb={1.5}>
                        {i.name}
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color={Colors.lightBlack}
                        fontSize={16}
                      >
                        M.No.
                        {i.phone}
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color={Colors.lightBlack}
                        fontSize={16}
                      >
                        {i.street}
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color={Colors.lightBlack}
                        fontSize={16}
                      >
                        {i.city}, {i.state} ( {i.country} )
                      </Text>
                      <Text
                        fontWeight="semibold"
                        color={Colors.lightBlack}
                        fontSize={16}
                      >
                        {i.pincode}
                      </Text>
                    </VStack>
                    <HStack w="full" >
                      <Button>Edit</Button>
                      <Button>Edit</Button>
                    </HStack>
                  </Box>
                ))}

              {/*add new address*/}
            </ScrollView>
          )}
          <Button
            rounded={10}
            py={3}
            bg={Colors.main}
            my={4}
            borderWidth={2}
            borderColor={Colors.white}
            _text={{
              fontSize: 16,
              color: Colors.white,
              fontWeight: "bold",
            }}
            onPress={() => openAddNewPopup()}
          >
            Add New Address
          </Button>
        </Box>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={newAddressPopup}
        onRequestClose={openAddNewPopup}
      >
        <View flex={1} bg={Colors.lightGreen}>
          <VStack py={12} px={6} space={4}>
            <Text textAlign="center" color={Colors.red}>
              {formError}
            </Text>
            <Input
              variant="outline"
              borderRadius={15}
              borderWidth={1.2}
              borderColor={Colors.lightBlack}
              placeholder="Full name *"
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setName(value)}
              value={name}
            />
            <Input
              variant="outline"
              borderRadius={15}
              type="number"
              borderWidth={1.2}
              borderColor={Colors.lightBlack}
              placeholder="Mobile No. *"
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setPhone(value)}
              value={phone}
            />
            <Input
              variant="outline"
              borderRadius={15}
              borderWidth={1.2}
              borderColor={Colors.lightBlack}
              placeholder="street/House no/Nearby  *"
              type="text"
              pl={2}
              borderBottomColor={Colors.black}
              fontSize={16}
              fontWeight="semibold"
              color={Colors.black}
              onChangeText={(value) => setStreet(value)}
              value={street}
            />
            <HStack justifyContent="space-between">
              <Input
                variant="outline"
                borderRadius={15}
                w="46%"
                borderWidth={1.2}
                borderColor={Colors.lightBlack}
                placeholder="Pincode *"
                type="number"
                pl={2}
                borderBottomColor={Colors.black}
                fontSize={16}
                fontWeight="semibold"
                color={Colors.black}
                onChangeText={(value) => setPincode(value)}
                value={pincode}
              />

              <Input
                variant="outline"
                borderRadius={15}
                w="50%"
                borderWidth={1.2}
                borderColor={Colors.lightBlack}
                placeholder="City *"
                type="text"
                pl={2}
                borderBottomColor={Colors.black}
                fontSize={16}
                fontWeight="semibold"
                color={Colors.black}
                onChangeText={(value) => setCity(value)}
                value={city}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <Input
                variant="outline"
                borderRadius={15}
                w="48%"
                borderWidth={1.2}
                borderColor={Colors.lightBlack}
                placeholder="State *"
                type="text"
                pl={2}
                borderBottomColor={Colors.black}
                fontSize={16}
                fontWeight="semibold"
                color={Colors.black}
                onChangeText={(value) => setState(value)}
                value={state}
              />
              <Input
                variant="outline"
                borderRadius={15}
                w="48%"
                borderWidth={1.2}
                borderColor={Colors.lightBlack}
                placeholder="Country *"
                type="text"
                pl={2}
                borderBottomColor={Colors.black}
                fontSize={16}
                fontWeight="semibold"
                color={Colors.black}
                onChangeText={(value) => setCountry(value)}
                value={country}
              />
            </HStack>

            <Button
              rounded="full"
              py={3}
              shadow={2}
              borderWidth={2}
              borderColor={Colors.white}
              _text={{
                color: Colors.white,
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => handleNewAddress()}
              // disabled={loading}
            >
              {loading ? "Loading..." : "Add Address"}
            </Button>
          </VStack>
        </View>
      </Modal>
    </Box>
  );
}
