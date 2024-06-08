import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CategoryProductSelect from "../Screens/Home/CategoryProductSelect";
import SubCategoryProducts from "../Screens/Home/SubCategoryProducts"; 

const Stack = createNativeStackNavigator();

export default function CategoryNav() {
  
  return (
    <Stack.Navigator
      initialRouteName="Category"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Category" component={CategoryProductSelect} />
      <Stack.Screen
        name="Products"
        component={SubCategoryProducts}
        options={{
          headerShown :true
        }}
      />
    </Stack.Navigator>
  );
}
