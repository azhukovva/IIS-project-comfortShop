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

interface GetRequestActions {
  categories: () => Promise<any>;
  products: () => Promise<any>;
  product: (id: string) => Promise<any>;
  getSubcategories: (id: string) => Promise<any>;
}

interface PostRequestActions {
  addCategory: (options: { name: string; id: number }) => Promise<any>;
  addProduct: (options: {
    name: string;
    description: string;
    price: number;
    category: string;
    user: UserType;
    stock: number;
    attributes: AttributeValue[];
  }) => Promise<any>;
  login: (options: { username: string; password: string }) => Promise<any>;
}

interface RequestActions {
  get: GetRequestActions;
  post: PostRequestActions;
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


const GetRequest: GetRequestActions = {
  categories: async () => {
    try {
      const response = await get("/api/categories/");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getSubcategories: async (id) => {
    try {
      const response = await get(`/api/categories/${id}/children/`);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  products: async () => {
    try {
      const response = await get("/api/products/");
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  product: async (id) => {
    try {
      const response = await get(`/api/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

const PostRequest: PostRequestActions = {
  login: async (options) => {
    try {
      const requestBody = {
        username: options.username,
        password: options.password,
      };
      console.log(requestBody);
      const response = await post("/api/login/", requestBody);
      sessionStorage.setItem("authToken", response.data.token); // Save token
      console.log("Login successful. Token saved.", response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  addCategory: async (options) => {
    try {
      const requestBody = {
        name: options.name,
        id: options.id,
      };
      console.log(requestBody);
      console.log("TOKEN", sessionStorage.getItem("authToken"));
      const response = await post("/api/categories/", requestBody, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("authToken")}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  addProduct: async (options) => {
    try {
      const requestBody = {
        name: options.name,
        description: options.description,
        price: options.price,
        category: options.category,
        user: options.user,
        stock: options.stock,
        attributes: options.attributes,
      };
      const response = await post("/api/products/", requestBody);
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

/*
 * Request protocol
 */
class Request implements RequestActions {
  get: GetRequestActions = GetRequest;
  post: PostRequestActions = PostRequest;
}

export const request = new Request();
