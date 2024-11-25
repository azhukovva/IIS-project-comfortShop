import React, { useState } from "react";
import Page from "../../components/Page/Page";

const Orders = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [basketItems, setBasketItems] = useState<any>({
    user: null,
    products: [],
  });

  return (
    <Page title="My Orders">
      <div></div>
    </Page>
  );
};

export default Orders;
