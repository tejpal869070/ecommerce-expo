import axios from "axios";
import { api } from "../../Config/api";
import * as SecureStore from "expo-secure-store";

export const userLogin = async (userData) => {
  try {
    const postData = {
      password: userData.password,
      email: userData.email,
    };

    const response = await axios.post(`${api.API_URL}user/login`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckUserExistance = async (userData) => {
  try {
    const postData = {
      mobile: userData.mobile,
      email: userData.email,
    };

    const response = await axios.post(
      `${api.API_URL}user/check-user-existence`,
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegistration = async (userData) => {
  try {
    const postData = {
      name: userData.name,
      mobile: userData.mobile,
      password: userData.password,
      email: userData.email,
    };
    const response = await axios.post(`${api.API_URL}user/register`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetUserDetails = async () => {
  try {
    const email = await SecureStore.getItemAsync("email");
    const token = await SecureStore.getItemAsync("token");

    const postData = {
      email: email,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/user-details`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const CheckToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  const email = await SecureStore.getItemAsync("email");

  // Check if token and email exist
  if (!token || !email) {
    return false;
  }

  const postData = {
    email: email,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      `${api.API_URL}user/token-check`,
      postData,
      axiosConfig
    );

    // Check if response status is true
    if (response.data.status) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const ChangeUserPassword = async (formData) => {
  try {
    const email = await SecureStore.getItemAsync("email");
    const token = await SecureStore.getItemAsync("token");
    const postData = {
      email: email,
      password: formData.oldPassword,
      new_password: formData.newPassword,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/change-password`,
      postData,
      axiosConfig
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddtoCart = async (formData) => {
  const email = await SecureStore.getItemAsync("email");
  if (!email) {
    return { status: false };
  }
  const postData = {
    email: email,
    product_id: formData.product_id,
    size: formData.size,
    color: formData.color,
  };
  try {
    const response = await axios.post(`${api.API_URL}user/add-cart`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CartData = async () => {
  const email = await SecureStore.getItemAsync("email");
  const postData = {
    email: email,
  };
  if (!email) {
    return { status: false };
  }
  try {
    const response = await axios.post(`${api.API_URL}user/get-cart`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CartRemove = async (id) => {
  const email = await SecureStore.getItemAsync("email");
  if (!email) {
    return { status: false };
  }
  const postData = {
    email: email,
    id: id,
  };
  try {
    const response = await axios.post(
      `${api.API_URL}user/remove-cart`,
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateUserDetails = async (formData) => {
  const email = await SecureStore.getItemAsync("email");
  try {
    const postData = {
      email: email,
      address: { ...formData },
    };
    const response = await axios.post(
      `${api.API_URL}user/update-user-details`,
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const RemoveAddress = async (id) => {
  const email = await SecureStore.getItemAsync("email");
  try {
    const postData = {
      email: email,
      id: id,
    };
    const response = await axios.post(
      `${api.API_URL}user/remove-address`,
      postData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
