import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import Button from "../../components/Button/Button";

import classes from "./Basket.module.css";
import { Link } from "react-router-dom";
import { axiosAuth, BasketProductType, UserType } from "../../utils/axios";
import Product from "../../components/Item/Product";
import { Context } from "../../utils/Context";
import SignInModal from "../../components/Modal/SignInModal/SignInModal";
import Input from "../../components/Input/Input";

type BasketProps = {
  user: UserType | null;
  products: BasketProductType[];
};

const Basket = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [basketItems, setBasketItems] = useState<BasketProps>({
    user: null,
    products: [],
  });

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [showSignInModal, setShowSignInModal] = useState(false);

  const { handleIsAuth, token, user, handleLoginClick } = useContext(Context);

  const removeFromBasket = async () => {
    try {
      const axiosAuthInstance = axiosAuth(token);
      const authToken = token;
      if (!authToken) {
        handleIsAuth(true);
      }
      const response = axiosAuthInstance.post(`/api/baskets/add_product`, user);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to add product:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to add product:", error);
      }
    }
  };

  console.log("ITEMS", basketItems)

  const onFinishOrder = async () => {
    try {
      if (!user) {
        handleLoginClick(true);
      }
      const axiosAuthInstance = axiosAuth(token);
      console.log("REQUEST", {
        user: {
          username: user?.username,
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
        },
        address: address,
        city: city,
        zip_code: zipCode,
      })
      const response = axiosAuthInstance.post(`/api/orders/`, {
        user: {
          username: user?.username,
          email: user?.email,
          first_name: user?.first_name,
          last_name: user?.last_name,
        },
        address: address,
        city: city,
        zip_code: zipCode,
      });
      console.log(response)
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Failed to add product:",
          (error as any).response?.data || error.message
        );
      } else {
        console.error("Failed to add product:", error);
      }
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(event.target.value);
  };

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const axiosAuthInstance = axiosAuth(token);
        const response = await axiosAuthInstance.get(
          `/api/baskets/${user?.id}`
        );
        setBasketItems(response.data || []);
      } catch (error) {
        console.error("Failed to fetch basket items:", error);
      }
    };

    if (user) {
      fetchBasketItems();
    }
  }, [user]);

  return (
    <Page title="My basket" isBasketPage isHeader>
      <div className={classes.basketContentContainer}>
        {!user ? (
          <div className={classes.isEmpty}>
            <span className={classes.isEmptyText}>
              Please log in to view your basket
            </span>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button isActive onClick={() => handleLoginClick(true)}>
                Log In
              </Button>
              <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
            </div>
          </div>
        ) : basketItems?.products.length === 0 ? (
          <div className={classes.isEmpty}>
            <span className={classes.isEmptyText}>Basket is empty</span>
            <Link to="/categories" style={{ textDecoration: "none" }}>
              <Button isActive iconName="right">
                Let's have some joy!
              </Button>
            </Link>
          </div>
        ) : (
          <div className={classes.mainContent}>
            <div style={{ display: "flex", gap: "2rem" }}>
              {basketItems.products.map((item) => (
                <div key={item.id}>
                  <Product item={item.product} onDelete={removeFromBasket} />
                </div>
              ))}
            </div>
            <div className={classes.addressForm}>
              <Input
                name="address"
                value={address}
                labelText="Address"
                placeholder="Enter your address"
                isRequired
                onChange={handleAddressChange}
              />
              <Input
                name="city"
                value={city}
                labelText="City"
                placeholder="Enter your city"
                isRequired
                onChange={handleCityChange}
              />
              <Input
                name="zipCode"
                value={zipCode}
                labelText="Zip Code"
                placeholder="Enter your zip code"
                isRequired
                onChange={handleZipCodeChange}
              />
            </div>
            <div className={classes.basketSummary}>
              <span>
                <strong>Total: </strong> {basketItems.products.length}
              </span>
              <div style={{ width: "fit-content" }}>
                <Button isActive onClick={onFinishOrder}>Finish Order</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </Page>
  );
};

export default Basket;
