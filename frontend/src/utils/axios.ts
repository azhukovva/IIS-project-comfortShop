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

interface getRequestType {}

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
