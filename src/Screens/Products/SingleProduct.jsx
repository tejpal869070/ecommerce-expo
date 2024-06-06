import { StatusBar } from "expo-status-bar";
import { Box, Button, Center, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { GetProductById } from "../../Controller/Product/ProductController";
import ProductImageSlider from "./ProductImageSlider";
import SingleProductLoading from "../../Componentes/Loadings/SingleProductLoading";
import { Colors } from "../../color";
import SelectDifferentColor from "./SelectDifferentColor";
import ProductDetails from "./ProductDetails";
import Review from "../../Componentes/Products/Review";
import SimilerProducts from "../../Componentes/Products/SimilerProducts";
import SelectVarients from "./SelectVarients";
import { useRoute } from "@react-navigation/native";

export default function SingleProduct() {
  const route = useRoute();
  const { itemId } = route.params;
  const [singleData, setSingleData] = useState();
  const [loading, setLoading] = useState(true);

  const getSingleProduct = async (itemId) => {
    const response = await GetProductById(itemId); 
    if (response.data[0].length === 0) {
      console.log("no data found");
      return;
    }
    setSingleData(response.data[0]);
    setLoading(false);
  };

  const [selected, setSelected] = useState(0);
  const onSelectChange = (index) => {
    setSelected(index);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    getSingleProduct(itemId);
  }, [itemId]);

  return (
    <Box flex={1} safeAreaTop bg={Colors.lightWhite}>
      <StatusBar hidden={false} style="dark" />

      {loading ? (
        <SingleProductLoading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProductImageSlider selected={selected} productData={singleData} />
          <SelectDifferentColor
            onSelectChange={onSelectChange}
            productData={singleData}
          />
          <ProductDetails productData={singleData} />

          <Review />
          <SimilerProducts />
        </ScrollView>
      )}

      <Center>
        <Button
          w="full"
          rounded={0}
          py={3}
          bg={Colors.skyblue}
          _text={{ fontSize: "18px", fontWeight: "bold" }}
          borderTopWidth={0.5}
          onPress={() => openModal()}
        >
          Buy Now
        </Button>
      </Center>

      {singleData && (
        <SelectVarients
          visible={modalVisible}
          onClose={closeModal}
          productData={singleData}
        />
      )}
    </Box>
  );
}
