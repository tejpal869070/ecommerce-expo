import { Box, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { Colors } from "../../color";
import { StatusBar } from "expo-status-bar";
import SearchBox from "../../Componentes/Home/SearchBox";
import { RefreshControl } from "react-native";
import Categories from "../../Componentes/Home/Categories";
import ImageSlider from "../../Componentes/ImageSlider";
import banner1 from "../../Assets/Images/banner1.jpg";
import banner2 from "../../Assets/Images/banner2.jpg";
import HomeProducts from "../../Componentes/Home/HomeProducts";
import Trendings from "../Products/Trendings";
import MensSection from "../Products/MensSection";
import { GetAllProducts } from "../../Controller/Product/ProductController";
import mensBanner from "../../Assets/Images/trendy-mens.jpeg";
import womensBanner from "../../Assets/Images/trending-women.jpeg";
import { useFocusEffect } from "@react-navigation/native";

const sliderImages = [banner1, banner2];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);
  const [mensProduct, setMensProducts] = useState([]);
  const [womensProducts, setWomensProducts] = useState([]);

  const onRefresh = () => {
    console.log("Refresh triggered...");
    setRefreshing(true);
    setTimeout(function () {
      setRefreshing(false);
    }, 2000);
  };

  //Get all products
  const getProducts = async () => {
    const response = await GetAllProducts();
    setProducts(response.data);
    setMensProducts(
      response.data
        .filter((obj) => obj.sub_category === "Mens")
        .map((item) => item.colorDetails)
        .flat()
    );
    setWomensProducts(
      response.data
        .filter((obj) => obj.sub_category === "Womens")
        .map((item) => item.colorDetails)
        .flat()
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getProducts();
    }, [])
  );

  return (
    <Box flex={1}>
      <StatusBar hidden={false} style="dark" />
      <SearchBox />
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageSlider images={sliderImages} />
        <Categories />
        <Trendings />
        {mensProduct && (
          <MensSection products={mensProduct} banner={mensBanner} />
        )}
        {womensProducts && (
          <MensSection products={womensProducts} banner={womensBanner} />
        )}

        {/* <HomeProducts/> */}
      </ScrollView>
    </Box>
  );
}
