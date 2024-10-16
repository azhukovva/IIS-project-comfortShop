import React, { Dispatch, createContext, useState } from "react";

/*
 * Root element where floating elements are generated
 */
export const floatingRoot = document.getElementById("portal");

type ContextType = {
  isLoading: boolean;
  isAuth: boolean;
  setIsLoading?: Dispatch<React.SetStateAction<boolean>>;
  isLoginClicked: boolean;
  handleLoginClick?: () => void;
};

type PropsType = {
  children: React.ReactNode;
};

const initialState: ContextType = {
  isLoading: false,
  isAuth: false,
  setIsLoading: () => {},
  isLoginClicked: false,
  handleLoginClick: () => {},
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  const handleLoginClick = () => {
    console.log("Login clicked");
    setIsLoginClicked((prev) => !prev);
  };

  const value: ContextType = {
    isLoading,
    isAuth,
    isLoginClicked,
    handleLoginClick
  };

  return (
    <Context.Provider value={value}>
      {/* TODO - add loading component */}
      {/* {isLoading && <Loading />} */}
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
