import React from "react";
import { useParams } from "react-router-dom";
import Page from "../../components/Page/Page";

const Items = () => {
  const { subcategory } = useParams();
  const title = subcategory ?? "";
  return (
    <Page title={title} isHeader isNavigation>
      <div></div>
    </Page>
  );
};

export default Items;
