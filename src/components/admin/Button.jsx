import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, icon, to }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${to}`)}
      className="btn bg-ungu hover:bg-tertiary drawer-button m-4 flex items-center justify-center gap-2"
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
