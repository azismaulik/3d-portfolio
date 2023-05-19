import React from "react";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-primary">
      <h1 className="text-9xl font-extrabold text-white">404</h1>
      <h1 className="text-lg font-extrabold text-white">Page Not Found</h1>

      <a href="/" className="mt-4 underline text-secondary">
        back to Home
      </a>
    </div>
  );
};

export default NotFound;
