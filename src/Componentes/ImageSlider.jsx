import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { Image, View } from "native-base";
import { Colors } from "../color";

const { width } = Dimensions.get("window");

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      autoplay={true}
      autoplayTimeout={3}
      showsPagination={false}
      height={170}
    >
      {images &&
        images.map((image, index) => (
          <View key={index} style={styles.slide} bg={Colors.black}>
            <Image
              source={image}
              w={width}
              h={170}
              alt="banner"
              resizeMode="cover"
            />
          </View>
        ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    justifyContent: "center",
    alignItems: "center",
    height: 170,
  },
  image: {
    width: width,
    height: 250,
  },
});

export default ImageSlider;
