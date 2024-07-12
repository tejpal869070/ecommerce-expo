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
      token: userData.token,
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
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
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

export const GetUserOrders = async (id) => {
  const email = await SecureStore.getItemAsync("email");
  try {
    const postData = {
      email: email,
    };
    const response = await axios.post(`${api.API_URL}user/get-order`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PlaceOrder = async (formData) => {
  console.log("order", formData);
  const email = await SecureStore.getItemAsync("email");
  try {
    const postData = {
      email: email,
      items: [...formData],
    };
    const response = axios.post(`${api.API_URL}user/add-order`, postData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const OtpVerification = async (formData) => {
  try {
    const postData = {
      email: formData.email,
      otp: formData.otp,
    };

    const response = await axios.post(
      `${api.API_URL}user/verify-otp`,
      postData
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SendOtp = async (emailid) => {
  try {
    const email = emailid;
    const dataToSend = {
      email: email,
    };
    const response = await axios.post(`${api.API_URL}user/get-otp`, dataToSend);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SetCartDataToLocal = async () => {
  const cartData = await SecureStore.getItemAsync("cartData");
  if (!cartData) {
    try {
      const response = await CartData();
      const ids = response.data.map((item) => ({ id: item.cart_id, qty: 1 }));
      await SecureStore.setItemAsync("cartData", JSON.stringify(ids));
    } catch (error) {
      console.log(error);
    }
  }
};

export const GetCartDataByIds = async () => {
  const localIds = await SecureStore.getItemAsync("cartData");
  const email = await SecureStore.getItemAsync("email");

  const ids = JSON.parse(localIds);

  const formData = {
    email: email,
    ids: ids.map((item) => item.id) || [],
  };
 

  try {
    const response = await axios.post(
      `${api.API_URL}user/get-cart-by-id`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
