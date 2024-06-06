import {
    Button,
    Center,
    HStack,
    Modal,
    Radio,
    Text,
    VStack,
  } from "native-base";
  import React, { useState } from "react";
  import { Colors } from "../../color";
  import { addresses } from "../../Assets/Data/UserData";
  import { useNavigation } from "@react-navigation/native";
  
  export default function CheckOut({ overAllCost }) {
    const navigation = useNavigation();
  
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
  
    const deliverCharges = (overAllCost * 0.1) / 100;
    const total = overAllCost + deliverCharges - 200;
  
    return (
      <Center px={5}>
        <Button
          bg={Colors.black}
          mt={4}
          w="full"
          rounded="full"
          py={4}
          mx={4}
          _pressed={{ bg: Colors.black }}
          _text={{ fontWeight: "bold" }}
          onPress={() => setShowModal(true)}
        >
          CHECKOUT
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Order</Modal.Header>
            <Modal.Body>
              <VStack space={3}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Sub Total</Text>
                  <Text color="black">₹{overAllCost}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Delivery Charges</Text>
                  <Text color="blueGray.400">+₹{Math.round(deliverCharges)}</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium">Extra Discount</Text>
                  <Text color="red.500">-₹200</Text>
                </HStack>
                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontWeight="medium" bold fontSize={18}>
                    Total Amount
                  </Text>
                  <Text color="green.500" bold fontSize={18}>
                    ₹{Math.round(total)}
                  </Text>
                </HStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setShowModal2(true);
                }}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
  
        <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="xl">
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Select Address</Modal.Header>
            <Modal.Body>
              <Radio.Group defaultValue="address1" name="address" size="sm">
                <VStack space={3}>
                  {addresses.map((i, index) => (
                    <Radio
                      alignItems="flex-start"
                      key={index}
                      _text={{
                        mt: "-1",
                        ml: "2",
                        fontSize: "sm",
                        maxWidth: "90%", // Adjust container width
                        whiteSpace: "normal", // Allow text wrapping
                        overflowWrap: "break-word", // Handle long words
                      }}
                      value={index}
                    >
                      {`${i.name}, ${i.street}, ${i.city}, ${i.state}, ${i.country}, ${i.pincode}, Mobile:, ${i.phone}`}
                    </Radio>
                  ))}
                </VStack>
              </Radio.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setShowModal3(true);
                }}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
  
        <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Payment Options</Modal.Header>
            <Modal.Body>
              <Radio.Group name="payment" size="sm">
                <VStack space={3}>
                  <Radio
                    alignItems="flex-start"
                    _text={{
                      mt: "-1",
                      ml: "2",
                      fontSize: "sm",
                    }}
                    value="payment1"
                  >
                    Cash on delivery
                  </Radio>
                  <Radio
                    alignItems="flex-start"
                    _text={{
                      mt: "-1",
                      ml: "2",
                      fontSize: "sm",
                    }}
                    value="payment2"
                    isDisabled={true}
                  >
                    Credit/ Debit/ ATM Card
                  </Radio>
                  <Radio
                    alignItems="flex-start"
                    _text={{
                      mt: "-1",
                      ml: "2",
                      fontSize: "sm",
                    }}
                    value="payment3"
                    isDisabled={true}
                  >
                    UPI
                  </Radio>
                </VStack>
              </Radio.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setShowModal(false);
                  setShowModal2(false);
                  setShowModal3(false);
                  navigation.navigate("OrderConfirm");
                }}
              >
                Continue
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
  