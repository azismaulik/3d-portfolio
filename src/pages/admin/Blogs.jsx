import React, { useState, useEffect } from "react";
import Sidebar from "./SIdebar";
import Header from "../../components/admin/Header";
import Button from "../../components/admin/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CardBlog from "../../components/admin/CardBlog";

const Modal = () => {
  <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/5 flex justify-center items-center">
    <div className="w-[400px] bg-secondary rounded text-primary p-4">
      <h1>
        yakin ingin menghapus{" "}
        <span className="font-semibold"> {blog.title}?</span>
      </h1>
      <div className="mt-4">
        <button
          onClick={() => handleDelete(blog._id)}
          className="btn btn-error"
        >
          hapus
        </button>
        <button onClick={() => setModal(false)} className="btn btn-ghost">
          cancel
        </button>
      </div>
    </div>
  </div>;
};

const Blogs = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [blogs, setBlogs] = useState([]);
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
    const myCookie = Cookies.get("token");
    if (!myCookie) {
      navigate("/login");
    }
    fetchBlog();
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="w-full min-h-screen flex-1 bg-primary">
        <Header text="Blogs" />

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
            label="Create Blog"
            to="create"
          />
          {loading ? (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 p-4 justify-evenly">
              {blogs.map((blog, i) => (
                <CardBlog key={i} {...blog} />
              ))}
            </div>
          )}
          {!blogs.length && !loading && (
            <div className="flex justify-center items-center w-full h-[40vh]">
              <h1 className="text-secondary font-bold text-2xl">
                Tidak Ada Blog
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
