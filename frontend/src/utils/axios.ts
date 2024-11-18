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

type UserType = {
  username: string;
};

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

const {
  get,
  post,
  delete: del,
} = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export type ProductType = {
  id: string; // unique id
  name: string; // name
  description: string;
  price: number;
  image: string;
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
