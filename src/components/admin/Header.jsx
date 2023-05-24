import React from "react";

const Header = ({ text }) => {
  return (
    <header className="w-full  bg-input p-4">
      <h1 className="text-white text-center text-2xl sm:text-5xl font-pangolin">
        {text}
      </h1>
    </header>
  );
};

export default Header;
