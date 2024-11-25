import React from "react";

type PropsType = {
  text: string;
  isGood?: boolean;
  isDelete?: boolean;
  isError?: boolean;
};

const Popup = ({ text, isGood, isDelete, isError }: PropsType) => {

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    color: "white",
    backgroundColor: isDelete ? "rgba(220, 162, 53, 0.929)" : isError ? "rgb(201, 68, 42)" : '#8AB358', 
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 20000,
  };

  return (
    <div style={popupStyle}>
      <p>{text}</p>
    </div>
  );
};

export default Popup;
