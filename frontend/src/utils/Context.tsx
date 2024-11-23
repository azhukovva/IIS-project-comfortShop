import React, { Dispatch, createContext, useState } from "react";
import { UserType } from "./axios";

/*
 * Root element where floating elements are generated
 */
export const floatingRoot = document.getElementById("root");

type ContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;

  token: string | null;
  setToken: (token: string | null) => void;

  isLoading: boolean;
  isAuth: boolean;

  showPopup: boolean;
  handlePopup: (state: boolean) => void;

  handleIsAuth: (state: boolean) => void;
  setIsLoading?: Dispatch<React.SetStateAction<boolean>>;
  isLoginClicked: boolean;
  handleLoginClick: (state?: boolean) => void;

  isLogoutClicked: boolean;
  handleLogoutClick: (state?: boolean) => void;

  isSelling: boolean;
  handleSelling: (state: boolean) => void;

  isAddNewItemClicked: boolean;
  handleAddNewItem: (state: boolean) => void;

  isAddNewCategoryClicked: boolean;
  handleAddNewCategory: (state: boolean) => void;

  isAddUser: boolean;
  handleAddUser: (state: boolean) => void;
};

type PropsType = {
  children: React.ReactNode;
};

const initialState: ContextType = {
  user: null,
  setUser: () => {},

  token: null,
  setToken: () => {},

  isLoading: false,
  isAuth: false,
  showPopup: false,
  handlePopup: () => {},

  handleIsAuth: () => {},
  setIsLoading: () => {},
  isLoginClicked: false,
  handleLoginClick: () => {},

  isLogoutClicked: false,
  handleLogoutClick: () => {},

  isSelling: false,
  handleSelling: () => {},

  isAddNewItemClicked: false,
  handleAddNewItem: () => {},

  isAddNewCategoryClicked: false,
  handleAddNewCategory: () => {},

  isAddUser: false,
  handleAddUser: () => {}
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = ({ children }: PropsType) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);  
  const [showPopup, setShowPopup] = useState(false);

  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [isSelling, setIsSelling] = useState(false);
  // Modals
  const [isAddNewItemClicked, setIsAddNewItemClicked] = useState(false);
  const [isAddNewCategoryClicked, setIsAddNewCategoryClicked] = useState(false);
  const [isAddUser, setIsAddUser] = useState(false);

  const handleLoginClick = (state?: boolean) => {
    setIsLoginClicked((prev) => (state !== undefined ? state : !prev));
  };

  const handleLogoutClick = (state?: boolean) => {
    setIsLogoutClicked((prev) => (state !== undefined ? state : !prev));
  };

  const handleIsAuth = (state: boolean) => {
    setIsAuth(state);
  };

  const handlePopup = (state: boolean) => {
    setShowPopup(state);
  }

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

  const handleAddUser = (state: boolean) => {
    setIsAddUser(state);
  };

  const value: ContextType = {
    user,
    setUser,

    token,
    setToken,

    isLoading,
    isAuth,
    showPopup,
    handlePopup,

    handleIsAuth,
    isLoginClicked,
    handleLoginClick,

    isLogoutClicked,
    handleLogoutClick,

    isSelling,
    handleSelling,

    isAddNewItemClicked,
    handleAddNewItem,

    isAddNewCategoryClicked,
    handleAddNewCategory,

    isAddUser,
    handleAddUser
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
