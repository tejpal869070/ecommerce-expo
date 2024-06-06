import {
    Box,
    Button,
    Center,
    FormControl,
    HStack,
    Heading,
    Image,
    Pressable,
    Select,
    VStack,
  } from "native-base";
  import React, { useState } from "react";
  import { Modal, ScrollView,   } from "react-native";
  import { Colors } from "../../color";
  import { api } from "../../Config/api";
  import { AntDesign } from "@expo/vector-icons";
  import InputSpinner from "react-native-input-spinner";
  
  export default function SelectVarients({ visible, onClose, productData }) {
   
    const[selectedSizeQty, setSelectedSizeQty] = useState(0)
   
  
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const handlePress = (index) => {
      setSelectedColorIndex((prevIndex) => (prevIndex === index ? null : index));
    };
  
    const sizes = productData.colorDetails[selectedColorIndex].sizeDetails.map((obj) => obj.size);
    const sizesAvailable = productData.colorDetails[selectedColorIndex].sizeDetails.map(
      (obj) => obj.quantity
    );
  
    const handleSizeChange=(selectedSizeIndex)=>{
      setSelectedSizeQty(sizes.indexOf(selectedSizeIndex))
    }
   
  
  
    const handleBuy = () => {};
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <Box
          flex={1}
          justifyContent="flex-end"
          alignItems="flex-start"
          bg={Colors.whiteTrans}
        >
          <Box
            bg={Colors.white}
            p={4}
            roundedTop={30}
            flexDirection="column"
            w="100%"
            h="60%"
            textAlign="center"
          >
            <VStack>
              <Heading
                fontSize={18}
                fontWeight="semibold"
                color={Colors.lightBlack}
              >
                Select Color
              </Heading>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <HStack py={1.5} space={2}>
                  {productData &&
                    productData.colorDetails.map((i, index) => (
                      <Pressable
                        key={index}
                        borderWidth={selectedColorIndex === index ? 4 : 0}
                        rounded={selectedColorIndex === index ? 8 : 0}
                        onPress={() => handlePress(index)}
                      >
                        <Center>
                          <Image
                            alt="imgs"
                            w={20}
                            h={20}
                            resizeMode="contain"
                            source={{
                              uri: `${api.API_URL}assets/img/${i.image_url[0].url}`,
                            }}
                          />
                        </Center>
                      </Pressable>
                    ))}
                </HStack>
              </ScrollView>
            </VStack>
            <HStack>
              <VStack mt={4} w="45%">
                <Heading
                  fontSize={18}
                  fontWeight="semibold"
                  color={Colors.lightBlack}
                >
                  Select Size
                </Heading>
                <FormControl w="3/4" maxW="300">
                  <Select
                    width={100}
                    accessibilityLabel="Choose Service"
                    onValueChange={(itemValue, itemIndex) => handleSizeChange(itemValue)}
                    placeholder="Sizes"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: (
                        <AntDesign name="checkcircleo" size={24} color="black" />
                      ),
                    }}
                    mt="1"
                  >
                    {sizes.map((i, index) => (
                      <Select.Item
                        label={`${i} ${
                          sizesAvailable[index] === 1
                            ? "Out of Stock"
                            : "     In Stock " + sizesAvailable[index]
                        }`}
                        value={i}
                        key={index}
                        
                        style={{
                          color:
                            sizesAvailable[index] === 1
                              ? Colors.red
                              : Colors.black,
                        }}
                        disabled={sizesAvailable[index] === 1}
                      />
                    ))}
                  </Select>
                </FormControl>
              </VStack>
              <VStack mt={4}  w="45%">
                <Heading
                  fontSize={18}
                  fontWeight="semibold"
                  color={Colors.lightBlack}
                  mb={1}
                >
                  Quantity
                </Heading>
                <InputSpinner
                    max={sizesAvailable[selectedSizeQty]}
                    min={1}
                    step={1}
                    height={40}
                    
                    initialValue={1}
                    width={150}
                    buttonFontSize={19}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    skin="round"
                  //   onChange={_.debounce((num) => {
                  //     const updatedPrices = [...prices];
                  //     updatedPrices[index] = num * ElectronicsData[index].price;
                  //     setPrice(updatedPrices);
                  //     totalCost(updatedPrices.reduce((i1,i2)=>i1+i2,0))
                  //   },500)}
                  />
              </VStack>
            </HStack>
  
            <HStack justifyContent="space-between">
              <Button
                w="50%"
                rounded={0}
                bg={Colors.skyblue}
                mt={6}
                _text={{ fontSize: "18px", fontWeight: "bold" }}
                borderLeftRadius={18}
                shadow={4}
              >
                Add to cart
              </Button>
              <Button
                w="50%"
                rounded={0}
                bg={Colors.main}
                mt={6}
                _text={{ fontSize: "18px", fontWeight: "bold" }}
                borderRightRadius={18}
                shadow={4}
                onPress={() => handleBuy()}
              >
                Buy
              </Button>
            </HStack>
  
            <Button mt={10} w={20} rounded="full" onPress={() => onClose()}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
  