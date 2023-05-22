import React from "react";
import Sidebar from "./SIdebar";
import Header from "../../components/admin/Header";

const Home = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="text-secondary w-full min-h-screen flex-1 bg-primary">
        <Header text="Welcome Back Azis" />
      </div>
    </div>
  );
};

export default Home;
