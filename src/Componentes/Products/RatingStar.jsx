import { Box, HStack, Text } from "native-base";
import React from "react"; 
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../color";

export default function RatingStar({ value, count }) {   
  return (
    <HStack h={6} space={1} alignItems="center"  roundedLeft={10}>
        <HStack space={0.4} mt={1}>
            <FontAwesome name={ value >= 1 ? 'star'  : value >=0.5 ? "star-half-empty" : "star-o" } size={14} color="#f6b022" />
            <FontAwesome name={ value >= 2 ? 'star'  : value >=1.5 ? "star-half-empty" : "star-o" } size={14} color="#f6b022" />
            <FontAwesome name={ value >= 3 ? 'star'  : value >=2.5 ? "star-half-empty" : "star-o" } size={14} color="#f6b022" />
            <FontAwesome name={ value >= 4 ? 'star'  : value >=3.5 ? "star-half-empty" : "star-o" } size={14} color="#f6b022" />
            <FontAwesome name={ value >= 5 ? 'star'  : value >=4.5 ? "star-half-empty" : "star-o" } size={14} color="#f6b022" />
        </HStack>
        <Text>{count ? `(${count} Reviews)` : ''}</Text>

    </HStack>
  );
}
