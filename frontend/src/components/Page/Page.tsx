import React, { useContext } from "react";
import classes from "./Page.module.css";
import Header from "../Header/Header";
import useBreadcrumb from "../../hooks/UseBreadcrumb";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Context } from "../../utils/Context";
import Modal from "../Modal/Modal";
import LoginModal from "../Login/LoginModal/LoginModal";

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

  const {isLoginClicked} = useContext(Context);

  return (
    <section className={classes.container}>
      {isHeader && <Header />}

      <div
        className={
          isWelcomePage ? classes.titleContainerWelcome : classes.titleContainer
        }
      >
        <h2 className={isWelcomePage ? classes.titleWelcome : classes.title}>
          {title}
        </h2>
        {isNavigation && <Breadcrumbs items={breadcrumbItems} />}
        {subtitle && <p className={classes.subtitle}>{subtitle}</p>}
      </div>
      {children}
     {isLoginClicked && <LoginModal />}
    </section>
  );
};

export default Page;
