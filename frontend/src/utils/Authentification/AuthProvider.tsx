import React, { Children, createContext, useContext, useState } from "react";
import { post, UserType } from "../axios";

type AuthContext = {
  authToken?: string | null; // undefined - pending, null - no token, string - token, OK
  currentUser?: UserType | null;
//   handleLogin: (username: string, password: string) => Promise<void>;
//   handleLogout: () => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await post("/api/login/", {
        username: username,
        password: password,
      });

      if (response?.data?.token) {
        console.log("Login response:", response.data);
        localStorage.setItem("authToken", response.data.token); // Store the token in localStorage

        setCurrentUser(response.data.user as UserType); //TODO
      }
    } catch (error) {
      console.log(error);
      setAuthToken(null);
      setCurrentUser(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{authToken, currentUser}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside of an AuthProvider");
  }

  return context;
}
