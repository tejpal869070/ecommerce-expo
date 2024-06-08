import axios from "axios";
import { api } from "../../Config/api";
import * as SecureStore from "expo-secure-store";

export const GetProductCategories = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllProducts = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-product`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetProductById = async (itemId) => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-product-id`, {
      id: itemId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetSubCategory = async () => {
  try {
    const response = await axios.post(`${api.API_URL}user/get-sub-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetSubCategoryProducts = async (formData) => { 
  try {
    const postData = {
      cat_id: formData.cat_id,
      sub_cat_id: formData.sub_cat_id,
    };
    const response = await axios.post(
      `${api.API_URL}user/get-sub-category-product`,
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
