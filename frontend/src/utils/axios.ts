/**
 * @fileoverview Request protocol implementation
 *
 * This file contains implementation of a request protocol.
 * Request protocol is the object that helps to make requests to
 * a backend.
 *
 * @module axios
 *
 */

import axios from "axios";

export type UserType = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type AuthTokenType = {
  username: string;
  password: string;
  token: string;
}

interface AttributeValue {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}


// --------------------------- API ---------------------------
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosAuthInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const getCsrfToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return csrfToken ? csrfToken.split("=")[1] : null;
};

// Request interceptor to include the auth token in the headers
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const csrfToken = getCsrfToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
      console.log(token);
    }
    // if (csrfToken) {
    //   config.headers["X-CSRFTOKEN"] = csrfToken;
    // }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry for authenticated requests
axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiry or invalid token
      console.log("Token is invalid or expired");
    }
    return Promise.reject(error);
  }
);

export const { get, post, delete: del, put, patch } = axiosInstance;
export const axiosAuth = axiosAuthInstance;

// --------------------------- API END ---------------------------

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  user: UserType;
  stock: number;
  attribute_values: [];
  image: string;
};

export type BasketProductType = {
  id: number;
  product: ProductType;
  quantity: number;
};

export type BasketType = {
  id: number;
  user: UserType;
  products: BasketProductType[];
};

export type CategoryType = {
  slug: string;
  name: string;
  parent: string;
  children: [];
  image: string;
};

export type PostType = {
  id: number | null;
  header: string | null;
  text: string;
  average_rating: string;
  ratings: RatingType[];
}

export type RatingType = {
  user: number;
  post: PostType;
  rating: number;
};

