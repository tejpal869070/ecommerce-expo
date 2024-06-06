import { Center, HStack, Image, ScrollView, Skeleton, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { GetAllProducts } from "../../Controller/Product/ProductController";
import { Colors } from "../../color";
import ProductCard from "../../Componentes/Home/ProductCard";
import img2 from "../../Assets/Images/trending-text.jpeg";

export default function Trendings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 

  //Get all products
  const getHomeProducts = async () => {
    const response = await GetAllProducts();
    const data = await response.data
      .map((obj) => obj.colorDetails)
      .flat()
      .filter((obj) => obj.top_selling === "true");
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    getHomeProducts();
  }, []);

  return (
    <Center flex={1} w="full">
      <Image alt="banner" w="full" h={20} source={img2} />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        w="full"
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <HStack space={2} key={index}>
                <Skeleton w="100px" h="160px" borderRadius={5} mr={2} />
              </HStack>
            ))
          : products.slice(2,8).map((item, index) => (
              <HStack space={2} px={1} key={index}>
                <ProductCard item={item} />
              </HStack>
            ))}
      </ScrollView>

      {/*-------------*/}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        w="full"
        my={2}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <HStack space={2} key={index}>
                <Skeleton w="100px" h="160px" borderRadius={5} mr={2} />
              </HStack>
            ))
          : products
              .slice(2, 8)
              .reverse()
              .map((item, index) => (
                <HStack space={2} px={1} key={index}>
                  <ProductCard item={item} />
                </HStack>
              ))}
      </ScrollView>
    </Center>
  );
}
