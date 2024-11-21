import React, { useContext, useState } from "react";
import classes from "./Page.module.css";
import useBreadcrumb from "../../hooks/UseBreadcrumb";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

type PropsType = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  isWelcomePage?: boolean;
  isBasketPage?: boolean;
  isHeader?: boolean;
  isNavigation?: boolean;
};

const Page = ({
  children,
  title,
  subtitle,
  isWelcomePage,
  isBasketPage,
  isNavigation,
}: PropsType) => {
  const breadcrumbItems = useBreadcrumb();

  return (
    <section className={classes.container}>
      <div
        className={
          isWelcomePage ? classes.titleContainerWelcome : classes.titleContainer
        }
      >
        {isNavigation && <Breadcrumbs items={breadcrumbItems} />}
        <h2 className={isWelcomePage ? classes.titleWelcome : classes.title}>
          {title}
        </h2>

        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      </div>

      <div className={isWelcomePage ? "" : classes.content}> {children}</div>
    </section>
  );
};

export default Page;
