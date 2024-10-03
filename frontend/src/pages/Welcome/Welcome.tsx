import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Welcome.module.css";

const Welcome = () => {
  return (
    <Page title="Welcome" subtitle="to Comfort Store">
      <div className={classes.commentContainer}><span>Please choose how you would like to continue:</span></div>
      <div className={classes.cardsContainer}></div>
    </Page>
  );
};

export default Welcome;
