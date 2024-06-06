import { Box, HStack, Skeleton } from "native-base";
import React from "react";
import { Colors } from "../../color";

export default function SingleProductLoading() {
  return (
    <Box flex={1} p={4} safeAreaTop  >
      <Box>
        <Skeleton w="full" h={350} rounded={8} />
      </Box>
      <Box mt={2}>
        <HStack space={2}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} w="70px" h="70px" borderRadius={8} />
          ))}
        </HStack>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} w="90%" h={2} mt={6} />
        ))}
        <HStack space={3} mt={4}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} w="70px" h="70px" borderRadius="full" />
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
