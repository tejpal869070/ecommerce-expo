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