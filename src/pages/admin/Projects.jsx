import React, { useEffect, useState } from "react";
import Sidebar from "./SIdebar";
import Header from "../../components/admin/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Button from "../../components/admin/Button";
import CardProject from "../../components/admin/CardProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/project`);
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const MyCookie = Cookies.get("token");
    if (!MyCookie) {
      navigate("/login");
    }
    fetchProject();
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="w-full min-h-screen flex-1 bg-primary">
        <Header text="Projects" />

        <div className="container mx-auto">
          <Button
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
                width="16"
              >
                <defs></defs>
                <path
                  d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"
                  fill="currentColor"
                ></path>
                <path
                  d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"
                  fill="currentColor"
                ></path>
              </svg>
            }
            label="add Project"
            to="create"
          />
          {loading && (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <span className="loader"></span>
            </div>
          )}
          {!projects.length && !loading && (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <h1 className="text-secondary font-bold text-2xl">
                Tidak Ada Project
              </h1>
            </div>
          )}
          <div className="flex flex-wrap gap-4 p-4 justify-evenly">
            {projects.map((project, i) => (
              <CardProject key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
