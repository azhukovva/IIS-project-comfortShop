import React from "react";
import Page from "../../components/Page/Page";

import classes from "./Welcome.module.css";
import RoleCard from "../../components/RoleCard/RoleCard";
import icons from "../../utils/icons";

const Welcome = () => {
  return (
    <Page title="Welcome" subtitle="to Comfort Store" isWelcomePage>
      <div className={classes.contentWelcome}>
        {/* NOTE - animation to one step */}
        <div className={classes.commentContainer}>
          {/* <span>
            <span className={classes.oneStep}>One step</span> before your
            inspiration begins.
          </span> */}
          <span>Please, let us know how you would like to continue:</span>
        </div>
        <div className={classes.cardsContainer}>
          <RoleCard title="User" description="continue as" icon={icons.user} page="/"/>
          <RoleCard title="Guest" description="continue as" icon={icons.guest} page="/categories"/>
        </div>
      </div>
    </Page>
  );
};

export default Welcome;
