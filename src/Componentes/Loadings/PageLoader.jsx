import { Box, HStack, Spinner } from "native-base";
import React from "react";
import { Colors } from "../Colors";

export default function PageLoader() {
  return (
    <Box position="absolute" top={0} flex={1}  bg={Colors.black}>
      <HStack space={8} justifyContent="center" alignItems="center"> 
        <Spinner size="lg" />
      </HStack>
    </Box>
  );
}
