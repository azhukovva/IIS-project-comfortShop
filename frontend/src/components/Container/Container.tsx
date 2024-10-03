import React from "react";
import classes from "./Container.module.css";

type PropsType = {
        children: React.ReactNode
}

const Container = ({children}: PropsType) => {
    return <div className={classes.container}>{children}</div>;
};

export default Container;
