import React, { Dispatch, createContext } from 'react';

type ContextType = {
    isLoading: boolean;
    isAuth: boolean;
    setIsLoading?: Dispatch<React.SetStateAction<boolean>>;
}

type PropsType = {
    children: React.ReactNode;
}

const initialState: ContextType = {
    isLoading: false,
    isAuth: false,
    setIsLoading: () => {}
}

export const Context = createContext<ContextType>(initialState);