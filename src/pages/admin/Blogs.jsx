import React from "react";
import Sidebar from "./SIdebar";
import Header from "../../components/admin/Header";

const Blogs = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="w-full min-h-screen flex-1 bg-primary">
        <Header text="Blogs" />
      </div>
    </div>
  );
};

export default Blogs;
