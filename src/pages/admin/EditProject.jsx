import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Editor from "../../components/Editor";

const EditProject = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [files, setFiles] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  const fetchProject = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseurl}/project/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setLink(data.link);
      setCategories(data.tag);
      setImage(data.image);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const categoryString = JSON.stringify(categories);

  async function updateProject(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("tag", categoryString);
    data.append("link", link);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files?.[0]);
    }
    try {
      const response = await fetch(`${baseurl}/project/${id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      alert("data telah di update");
      setRedirect(true);
    } catch (error) {
      console.error(error);
      alert("Failed to update post");
    }
  }

  function handleCategoryChange(event) {
    event.preventDefault();
    setSelectedCategory(event.target.value);
  }

  function addCategory() {
    if (selectedCategory) {
      setCategories([...categories, selectedCategory]);
      setSelectedCategory(""); // reset selectedCategory after adding
    }
  }

  function removeCategory(index) {
    setCategories([
      ...categories.slice(0, index),
      ...categories.slice(index + 1),
    ]);
  }

  const handleImageChange = (e) => {
    setFiles(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (redirect) {
    return <Navigate to={"/admin/projects"} />;
  }

  const myCookie = Cookies.get("token");

  function logout() {
    Cookies.remove("token");
    window.location.reload();
  }
  if (!myCookie) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-full min-h-screen bg-bg-form bg-cover bg-fixed md:p-10 flex justify-center">
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <form
          onSubmit={updateProject}
          className="w-[1000px] p-4 md:p-8 rounded bg-input/50 md:glass"
        >
          <div className="flex items-center justify-between">
            <Link to={-1} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
                width="20"
              >
                <path
                  d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
                  fill="currentColor"
                ></path>
              </svg>
              <p>back</p>
            </Link>
            <p
              className="text-sm font-semibold cursor-pointer"
              onClick={logout}
            >
              Logout
            </p>
          </div>
          <div className="w-full my-4">
            <label className="text-sm text-white font-semibold">
              Image <span className="text-xs font-normal">*ukuran kecil</span>
            </label>
            <div
              className="w-full h-[350px] flex justify-center items-center rounded border my-2 border-dashed border-secondary relative
          "
            >
              {image && (
                <div
                  className="bg-red-500 p-1 rounded-full absolute -top-2 -right-2 cursor-pointer"
                  onClick={() => setImage(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    className="w-5 text-white"
                  >
                    <path
                      d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              )}
              {image ? (
                <img
                  src={
                    image.includes("blob") ? `${image}` : `${baseurl}/${image}`
                  }
                  alt=""
                  className="w-full h-full rounded object-cover"
                />
              ) : (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                    className="w-8 mx-auto"
                  >
                    <path
                      d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <p className="text-sm">or drag n drop</p>
                </div>
              )}
              <input
                type="file"
                className="w-full h-full absolute top-0 p-2 rounded my-2 cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="w-full my-4 ">
            <label className="text-sm text-white font-semibold">Tag</label>
            <input
              type="text"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="w-full p-2 rounded my-2 bg-input text-white text-sm border border-secondary"
              placeholder="Tags"
            />
            <div className="flex gap-2 items-center ">
              {selectedCategory && (
                <button
                  className="text-xs py-1 px-3 bg-secondary text-white rounded"
                  onClick={addCategory}
                >
                  add
                </button>
              )}
              <div className="flex gap-2">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="text-xs relative px-2 border self-center border-secondary rounded-full"
                  >
                    {category}{" "}
                    <button onClick={() => removeCategory(index)}>x</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full my-4 ">
            <label className="text-sm text-white font-semibold">
              Link Website
            </label>
            <input
              type="text"
              className="w-full p-2 rounded my-2 bg-input text-white text-sm border border-secondary"
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="w-full my-4 ">
            <label className="text-sm text-white font-semibold">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded my-2 bg-input text-white text-sm border border-secondary"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="w-full my-4">
            <label className="text-sm text-white font-semibold">
              Description
            </label>
            <Editor value={description} onChange={setDescription} required />
          </div>
          <button className="text-center w-full bg-input rounded p-2">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProject;
