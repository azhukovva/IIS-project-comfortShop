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
  handleLoginClick: () => void;

  isSelling: boolean;
  handleSelling: (state: boolean) => void;

  isAddNewItemClicked: boolean;
  handleAddNewItem: (state: boolean) => void;
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

  isSelling: false,
  handleSelling: () => {},

  isAddNewItemClicked: false,
  handleAddNewItem: () => {},
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  const [isAddNewItemClicked, setIsAddNewItemClicked] = useState(false);

  const handleLoginClick = () => {
    setIsLoginClicked((prev) => !prev);
  };

  // Handle "sell" button(in header) click
  const handleSelling = (state: boolean) => {
    setIsSelling(state);
  }

  const handleAddNewItem = (state: boolean) => {
    setIsAddNewItemClicked(state);
  }

  const value: ContextType = {
    isLoading,
    isAuth,
    isLoginClicked,
    handleLoginClick,

    isSelling,
    handleSelling,

    isAddNewItemClicked,
    handleAddNewItem,
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
