import React, { useState, useEffect } from "react";
import Sidebar from "./SIdebar";
import Header from "../../components/admin/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/post`);
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const MyCookie = Cookies.get("token");
    if (!MyCookie) {
      navigate("/login");
    }
    fetchBlog();
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="text-secondary w-full min-h-screen overflow-auto flex-1 bg-primary">
        <Header text="Welcome Back Azis" />
        <div className="container mx-auto h-full bg-secondary"></div>
      </div>
    </div>
  );
};

export default Home;
