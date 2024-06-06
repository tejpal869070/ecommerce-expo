import { Center, HStack, Image, ScrollView } from "native-base";
import React from "react";
import { Pressable } from "react-native";
import { api } from "../../Config/api";

export default function SelectDifferentColor({ onSelectChange, productData }) {
  const data = productData.colorDetails;
  const handleSelectChange = (index) => {
    onSelectChange(index);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <HStack py={1.5} px={2} space={2}>
        {data &&
          data.map((i, index) => (
            <Pressable onPress={() => handleSelectChange(index)} key={index}>
              <Center>
                <Image
                  alt="imgs"
                  w={20}
                  h={20}
                  source={{
                    uri: `${api.API_URL}assets/img/${i.image_url[0].url}`,
                  }}
                />
              </Center>
            </Pressable>
          ))}
      </HStack>
    </ScrollView>
  );
}
