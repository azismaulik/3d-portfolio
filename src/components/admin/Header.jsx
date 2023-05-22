import React from "react";

const Header = ({ text }) => {
  return (
    <div className="w-full bg-tertiary/75 p-4">
      <h1 className="text-secondary text-center text-2xl sm:text-5xl font-pangolin">
        {text}
      </h1>
    </div>
  );
};

export default Header;
