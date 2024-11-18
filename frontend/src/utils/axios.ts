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

interface GetRequestActions {
  categories: () => Promise<any>;
  products: () => Promise<any>;
}

interface PostRequestActions {
  category: () => Promise<any>;
  product: () => Promise<any>;
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

const GetRequest: GetRequestActions = {
  categories: async () => {
    try {
      const response = await get("/api/categories/");
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
  }
};

const PostRequest: PostRequestActions = {
  category: async () => {
    try {
      const response = await post("/api/categories/");
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  product: async () => {
    try {
      const response = await post("/api/products/");
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * Request protocol
 *
 * Request protocol is the object that helps to make requests to
 * a backend.
 *
 * @example
 * const { operators } = await request.get.operators() // fetches requests
 */
class Request implements RequestActions {
  get: GetRequestActions = GetRequest;
  post: PostRequestActions = PostRequest;
}

export default Request;
