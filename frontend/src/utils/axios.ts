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

export type ProductType = {
    id: string;
    name: string; // name
    description: string;
    price: number;
    image: string;
}