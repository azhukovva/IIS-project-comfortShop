import React from "react";
import classes from "./Page.module.css";
import Header from "../Header/Header";
import useBreadcrumb from "../../hooks/UseBreadcrumb";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

type PropsType = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  isWelcomePage?: boolean;
  isHeader?: boolean;
  isNavigation?: boolean;
};

const Page = ({
  children,
  title,
  subtitle,
  isWelcomePage,
  isHeader,
  isNavigation,
}: PropsType) => {
  const breadcrumbItems = useBreadcrumb();

  return (
    <section className={classes.container}>
      {isHeader && <Header />}
      {isNavigation && <Breadcrumbs items={breadcrumbItems} />}
      <div
        className={
          isWelcomePage ? classes.titleContainerWelcome : classes.titleContainer
        }
      >
        <h2 className={isWelcomePage ? classes.titleWelcome : classes.title}>
          {title}
        </h2>
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
};

export default Page;
