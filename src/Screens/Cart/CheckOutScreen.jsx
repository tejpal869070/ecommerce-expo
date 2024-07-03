import React from "react";
import { Box, Text, VStack, HStack, Button, Icon } from "native-base";
import { Colors } from "../../color";

export default function CheckOutScreen() {
  return (
    <Box bg={Colors.lightGreen} safeAreaTop flex={1}>
      <VStack space={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          Checkout
        </Text>
        <HStack
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor={Colors.lightWhiteGreen}
          py={2}
        >
          <Text>Subtotal:</Text>
          <Text>$100.00</Text>
        </HStack>
        <HStack
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor={Colors.lightWhiteGreen}
          py={2}
        >
          <Text>Tax (10%):</Text>
          <Text>$10.00</Text>
        </HStack>
        <HStack
          justifyContent="space-between"
          borderBottomWidth={1}
          borderBottomColor={Colors.lightWhiteGreen}
          py={2}
        >
          <Text>Total:</Text>
          <Text>$110.00</Text>
        </HStack>
        <Button
          mt={4}
          bg={Colors.main2}
          _text={{ color: "white" }}
          onPress={() => console.log("Place Order")}
        >
          Place Order
        </Button>
        <Button
          mt={2}
          variant="outline"
          bg={Colors.lightGray}
          _text={{ color: Colors.main2 }}
          onPress={() => console.log("Cancel")}
        >
          Cancel
        </Button>
      </VStack>
    </Box>
  );
}
