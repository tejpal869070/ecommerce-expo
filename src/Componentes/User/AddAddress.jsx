import { Box, Button, HStack, Input, Text, VStack, View } from "native-base";
import React, { useState } from "react";
import { Alert, Modal, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../../color";
import { UpdateUserDetails } from "../../Controller/User/UserController";

export default function AddAddress({ newAddressPopup, openAddNewPopup }) {
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
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
        Alert.alert(
          "Success",
          "New address added.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => console.log("added"),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={newAddressPopup}
      onRequestClose={openAddNewPopup}
    >
      <View flex={1} bg={Colors.lightGreen}>
        <Pressable onPress={() => openAddNewPopup()}>
          <HStack justifyContent="space-between" pt={5} px={5}>
            <Text />
            <Entypo name="circle-with-cross" size={24} color="black" />
          </HStack>
        </Pressable>
        <VStack py={4} px={6} space={4}>
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
  );
}
