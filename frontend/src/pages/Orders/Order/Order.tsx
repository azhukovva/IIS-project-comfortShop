import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../utils/Context";
import { axiosAuth, OrderProductType } from "../../../utils/axios";

import classes from "./Order.module.css";
import Page from "../../../components/Page/Page";

const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>({});

  const { token } = useContext(Context);

  useEffect(() => {
    const fetchOrder = async () => {
      const axiosAuthInstance = axiosAuth(token);

      try {
        const response = await axiosAuthInstance.get(`/api/orders/${orderId}`);
        setOrder(response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="My Order">
    <div className={classes.orderContainer}>
      <h1>Order Details</h1>
      <div className={classes.orderInfo}>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>User:</strong> {order.user.username}</p>
        <p><strong>Address:</strong> {order.adress}</p>
        <p><strong>City:</strong> {order.city}</p>
        <p><strong>Zip Code:</strong> {order.zip_code}</p>
        <p><strong>Total Price:</strong> {order.total_price}</p>
        <p><strong>Created At:</strong> {order.created_at}</p>
        <p><strong>Updated At:</strong> {order.updated_at}</p>
      </div>
      <h2>Products</h2>
      <div className={classes.products}>
        {order.products.map((product: OrderProductType) => (
          <div key={product.id} className={classes.product}>
            <p><strong>Product ID:</strong> {product.product.id}</p>
            <p><strong>Title:</strong> {product.product.title}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Price:</strong> {product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </Page>
  );
};

export default Order;
