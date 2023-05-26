import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/SIdebar";
import Header from "../../components/admin/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/bg4.svg";

const Card = ({ title, jumlah, to, icon, bg }) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer py-2 px-4 w-full h-[170px] sm:w-[350px] rounded bg-input shadow-md shadow-ungu bg-cover flex flex-col gap-2 justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
      onClick={() => navigate(`${to}`)}
    >
      <div>{icon}</div>
      <div>
        <p className="font-semibold">
          <span> {jumlah} </span>Total
          <span className="ml-1">{title}</span>
        </p>
      </div>
    </div>
  );
};

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

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/project`);
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const myCookie = Cookies.get("token");
    if (!myCookie) {
      navigate("/login");
    }
    fetchBlog();

    fetchProject();
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="text-secondary w-full min-h-screen overflow-auto flex-1 bg-primary">
        <Header text="Dashboard" />
        <div className="container mx-auto p-4 sm:py-6">
          <div className="w-full flex flex-wrap gap-4 sm:gap-6">
            <Card
              bg={bg1}
              title={blogs > 1 ? "Posts" : "Post"}
              jumlah={blogs.length}
              to="/admin/blogs"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                  className="w-16 text-white"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6"></path>
                    <circle cx="6" cy="18" r="2"></circle>
                    <path d="M8 18V6a2 2 0 1 0-4 0v12"></path>
                  </g>
                </svg>
              }
            />
            <Card
              bg={bg1}
              title={projects > 1 ? "Projects" : "Project"}
              jumlah={projects.length}
              to="/admin/projects"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 1024 1024"
                  className="w-16 text-white"
                >
                  <defs></defs>
                  <path
                    d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8l86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 512H160V232h704v440z"
                    fill="currentColor"
                  ></path>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
