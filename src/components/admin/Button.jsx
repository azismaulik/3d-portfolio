import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, icon, to }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${to}`)}
      className="btn btn-primary drawer-button m-4 flex items-center justify-center gap-2"
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
