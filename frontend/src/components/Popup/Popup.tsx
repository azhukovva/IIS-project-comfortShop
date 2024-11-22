import React from "react";

type PropsType = {
  text: string;
  isGood?: boolean;
};

const Popup = ({ text, isGood }: PropsType) => {

  const popupStyle: React.CSSProperties = {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    color: "#4a4a4a",
    backgroundColor: 'white', 
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  };

  return (
    <div style={popupStyle}>
      <p>{text}</p>
    </div>
  );
};

export default Popup;
