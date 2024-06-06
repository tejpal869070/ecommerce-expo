import { Box, Center, HStack, Image, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { Colors } from "../../color";
import InputSpinner from "react-native-input-spinner";
import { MaterialIcons } from "@expo/vector-icons";
import { ElectronicsData } from "../../Assets/Data/ElectronicsData";

export default function CartItem2({ totalCost }) {
  const handleRemove = (index) => {
    ElectronicsData.splice(index, 1);
  };

  const prices = ElectronicsData.slice(0, 4).map((item) => item.price);
  const [price, setPrice] = useState(prices);

  const handleCostChange = () => {
    const totalPrice = price.reduce((i1, i2) => i1 + i2, 0);
    totalCost(totalPrice);
  };

  useEffect(()=>{
    handleCostChange();
  },[])

  return (
    <Box px={3}>
      {ElectronicsData.slice(0, 4).map((i, index) => (
        <HStack
          w="full"
          key={index}
          bg={Colors.white}
          rounded={10}
          p={2}
          shadow={2}
          mb={2}
        >
          <Box w="25%">
            <Image
              source={i.image_url}
              w={20}
              h={20}
              resizeMode="contain"
              alt="cart"
            />
          </Box>
          <VStack w="73%" px={2}>
            <Text fontSize={16} isTruncated>
              {i.title}
            </Text>
            <Text fontSize="12px" mb={2} color={Colors.lightBlack}>
              Storage: 12/512
            </Text>
            <HStack justifyContent="space-between">
              <HStack space={2}>
                <InputSpinner
                  max={10}
                  min={1}
                  step={1}
                  height={22}
                  initialValue={1}
                  width={80}
                  buttonFontSize={19}
                  colorMax={"#f04048"}
                  colorMin={"#40c5f4"}
                  skin="round"
                  onChange={_.debounce((num) => {
                    const updatedPrices = [...prices];
                    updatedPrices[index] = num * ElectronicsData[index].price;
                    setPrice(updatedPrices);
                    totalCost(updatedPrices.reduce((i1,i2)=>i1+i2,0))
                  },500)}
                />
                <MaterialIcons
                  onPress={() => handleRemove(index)}
                  name="delete"
                  size={24}
                  color="red"
                />
              </HStack>
              <Text color={Colors.green} fontWeight="semibold">
                ₹{price[index]}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      ))}
    </Box>
  );
}
