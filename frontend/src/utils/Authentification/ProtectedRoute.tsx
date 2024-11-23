import { PropsWithChildren, useContext } from "react";
import { UserType } from "../axios";
import { useAuth } from "./AuthProvider";
import React from "react";
import { Context } from "../Context";

type PropsType = PropsWithChildren & {
  children: React.ReactNode;
  allowedRoles?: string[];
};

export default function ProtectedRoute({allowedRoles, children}: PropsType) {
    const {currentUser} = useAuth();
    const {handleLoginClick} = useContext(Context);

    if (currentUser === undefined){
        return <div>Loading...</div>
    }
    const hasAccess = allowedRoles
    ? currentUser?.groups.some(group => allowedRoles.includes(group))
    : true; 

    if (currentUser === null || hasAccess) {
        handleLoginClick(true);
        return <div>Permission denied</div>
    }

    return children;
}
