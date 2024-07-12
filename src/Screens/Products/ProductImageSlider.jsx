import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { Image, View } from "native-base";
import { Colors } from "../../color";
import { api } from "../../Config/api";

const { width } = Dimensions.get("window");

const ProductImageSlider = ({ selected, productData }) => {
  const key = `slider-${selected}`;
  return (
    <Swiper
      style={styles.wrapper}
      key={key}
      showsButtons={true}
      autoplay={true}
      autoplayTimeout={3}
      showsPagination={false}
      height={400}
    >
      {productData.colorDetails[selected].image_url.map((i, index) => (
        <View key={index} style={styles.slide} bg={Colors.lightWhite}>
          <Image
            source={{ uri: `${api.API_URL}assets/img/${i.url}` }}
            w={width}
            h={400}
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
    height: 400,
  },
  image: {
    width: width,
    height: 250,
  },
});

export default ProductImageSlider;
