import React, { useContext, useState } from "react";
import classes from "./RoleCard.module.css";
import { Icon } from "@iconify/react";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Login/LoginModal/LoginModal";
import { Context } from "../../utils/Context";

type PropsType = {
  title: string;
  description: string;
  icon: icons;
  page: string;
  isUser?: boolean;
};

const RoleCard = ({
  title,
  description,
  icon,
  page,
  isUser = false,
}: PropsType) => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const navigate = useNavigate();

  const {handleIsAuth} = useContext(Context)

  // Prevents the default link behavior and shows the login modal if isUser is true
  const handleUserClick = (event: React.MouseEvent) => {
    if (isUser) {
      event.preventDefault();
      setIsLoginClicked(true);
    }
  };
  // Closes the login modal
  const handleLoginClick = () => {
    setIsLoginClicked(false);
  };

  // Closes the login modal and navigates to the specified page
  const handleLogin = () => {
    handleIsAuth(true);
    navigate(page);
    setIsLoginClicked(false);
  };

  console.log(icon)

  return (
    <>
      <Link
        to={page}
        style={{ textDecoration: "none", color: "black" }}
        onClick={handleUserClick}
      >
        <div className={classes.cardContainer}>
          <Icon icon={icon} width={48} />
          <div className={classes.textContainer}>
            <p className={classes.descriptionContainer}>{description}</p>
            <h2 className={classes.titleContainer}>{title}</h2>
          </div>
        </div>
      </Link>
      {isLoginClicked && (
        <LoginModal onClose={handleLoginClick} onSubmit={handleLogin} handleIsAuth={handleIsAuth}/>
      )}
    </>
  );
};

export default RoleCard;
