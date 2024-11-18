import React, { Dispatch, createContext, useState } from "react";

/*
 * Root element where floating elements are generated
 */
export const floatingRoot = document.getElementById("root");

export const categoriesMap: Record<string, string[]> = {
  "home-cozyness": ["Plants", "Candles", "Blankets", "Decor"],
  "hobby-leisure": ["Books", "Board Games", "Sports Gear", "Art Supplies"],
  sweets: ["Chocolates", "Candies", "Gourmet Snacks"],
  "beauty-care": ["Skincare", "Makeup", "Hair Care", "Fragrances"],
};

type ContextType = {
  isLoading: boolean;
  isAuth: boolean;
  handleIsAuth: (state: boolean) => void;
  setIsLoading?: Dispatch<React.SetStateAction<boolean>>;
  isLoginClicked: boolean;
  handleLoginClick: (state?: boolean) => void;

  isSelling: boolean;
  handleSelling: (state: boolean) => void;

  isAddNewItemClicked: boolean;
  handleAddNewItem: (state: boolean) => void;

  isAddNewCategoryClicked: boolean;
  handleAddNewCategory: (state: boolean) => void;
};

type PropsType = {
  children: React.ReactNode;
};

const initialState: ContextType = {
  isLoading: false,
  isAuth: false,
  handleIsAuth: () => {},
  setIsLoading: () => {},
  isLoginClicked: false,
  handleLoginClick: () => {},

  isSelling: false,
  handleSelling: () => {},

  isAddNewItemClicked: false,
  handleAddNewItem: () => {},

  isAddNewCategoryClicked: false,
  handleAddNewCategory: () => {},
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  // Modals
  const [isAddNewItemClicked, setIsAddNewItemClicked] = useState(false);
  const [isAddNewCategoryClicked, setIsAddNewCategoryClicked] = useState(false);

  const handleLoginClick = (state?: boolean) => {
    setIsLoginClicked((prev) => (state !== undefined ? state : !prev));
  };

  const handleIsAuth = (state: boolean) => {
    setIsAuth(state);
  };

  // Handle "sell" button(in header) click
  const handleSelling = (state: boolean) => {
    setIsSelling(state);
  };

  const handleAddNewItem = (state: boolean) => {
    setIsAddNewItemClicked(state);
  };

  const handleAddNewCategory = (state: boolean) => {
    setIsAddNewCategoryClicked(state);
  };

  const value: ContextType = {
    isLoading,
    isAuth,
    handleIsAuth,
    isLoginClicked,
    handleLoginClick,

    isSelling,
    handleSelling,

    isAddNewItemClicked,
    handleAddNewItem,

    isAddNewCategoryClicked,
    handleAddNewCategory,
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
