import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../utils/Context";
import { axiosAuth, OrderProductType, OrderType } from "../../../utils/axios";

import classes from "./Order.module.css";
import Page from "../../../components/Page/Page";
import Button from "../../../components/Button/Button";
import { Icon } from "@iconify/react";
import icons from "../../../utils/icons";

const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orders, setOrders] = useState<OrderType[]>([]);

  const [showSignInModal, setShowSignInModal] = useState(false);

  const { token, user, handleLoginClick } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      const axiosAuthInstance = axiosAuth(token);

      try {
        const response = await axiosAuthInstance.get(`/api/orders/`);
        setOrders(response.data);
        console.log("Order:", response.data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [orderId, token]);

  //   if (!orders || orders.length === 0) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <Page title="My Orders">
         <div className={classes.rowTop}>
        <Button isBack isActive onClick={() => navigate(-1)}>
          <Icon icon={icons.left} width={20} />
        </Button>
      </div>
      {!user ? (
        <div className={classes.isEmpty}>
          <span className={classes.isEmptyText}>
            Please log in to view your orders
          </span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button isActive onClick={() => handleLoginClick(true)}>
              Log In
            </Button>
            <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}
          >
            <div className={classes.products}>
              {orders &&
                orders.map((order: OrderType) => (
                  <div key={order.id} className={classes.orderContainer}>
                    <div>
                      <h2>Order ID: {order.id}</h2>
                      <p style={{ opacity: ".6" }}>
                        <strong>User:</strong> {order.user.first_name}
                        {order.user.last_name} ({order.user.email})
                      </p>
                    </div>

                    <p style={{ fontSize: "1.2rem" }}>
                      <strong>Where to: </strong>
                      {order.address
                        ? `${order.address}, ${order.city} (
            ${order.zip_code})`
                        : "No address provided"}
                    </p>
                    <div>
                      <h3>Products:</h3>
                      <ul style={{ display: "flex", flexDirection: "column" }}>
                        {Object.entries(
                          order.products.reduce(
                            (acc, product: OrderProductType) => {
                              const { title } = product.product;
                              if (!acc[title]) {
                                acc[title] = {
                                  ...product,
                                  quantity: product.quantity,
                                };
                              } else {
                                acc[title].quantity += product.quantity; // Add quantity if duplicate
                              }
                              return acc;
                            },
                            {} as Record<string, OrderProductType>
                          )
                        ).map(([title, groupedProduct]) => (
                          <div
                            key={groupedProduct.id}
                            style={{
                              margin: "1rem 0",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              padding: "1rem",
                              width: "200px",
                              textAlign: "center",
                            }}
                          >
                            <h3
                              style={{
                                fontSize: "1.4rem",
                                marginBottom: "0.3rem",
                              }}
                            >
                              {groupedProduct.product.title}
                            </h3>
                            <p style={{ fontSize: "0.9rem", color: "#666" }}>
                              Category: {groupedProduct.product.category}
                            </p>
                            {groupedProduct.quantity > 1 && (
                              <p
                                style={{
                                  fontWeight: "bold",
                                  marginTop: "1rem",
                                }}
                              >
                                Quantity: x{groupedProduct.quantity}
                              </p>
                            )}
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "1.4rem" }}>
                        Total Price: {order.total_price}
                      </span>
                      <span style={{ opacity: ".6" }}>
                        Created:
                        {new Date(order.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default Order;
