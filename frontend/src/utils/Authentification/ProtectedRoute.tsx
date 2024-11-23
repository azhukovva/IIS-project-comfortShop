import { PropsWithChildren, useContext } from "react";
import { UserType } from "../axios";
import { useAuth } from "./AuthProvider";
import React from "react";
import { Context } from "../Context";

type PropsType = PropsWithChildren & {
  children: React.ReactNode;
  allowedRoles?: UserType['role'][];
};

export default function ProtectedRoute({allowedRoles, children}: PropsType) {
    const {currentUser} = useAuth();
    const {handleLoginClick} = useContext(Context);

    if (currentUser === undefined){
        return <div>Loading...</div>
    }

    if (currentUser === null || (allowedRoles && !allowedRoles.includes(currentUser.role))) {
        handleLoginClick(true);
        return <div>Permission denied</div>
    }

    return children;
}
