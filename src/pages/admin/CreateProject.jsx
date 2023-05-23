import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { BackMenu } from "../../components/BackMenu";
import Editor from "../../components/Editor";

const CreateProject = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [user, setUser] = useState(userInfo?.username);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const myCookie = Cookies.get("token");

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  function logout() {
    Cookies.remove("token");
    window.location.reload();
  }

  const categoryString = JSON.stringify(categories);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("description", description);
    data.set("tag", categoryString);
    data.set("file", files[0]);
    e.preventDefault();
    const response = await fetch(`${baseurl}/project`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      alert("project telah ditambahkan");
      setRedirect(true);
    }
  }

  function handleCategoryChange(event) {
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

  if (!myCookie) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={"/admin/projects"} />;
  }

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center">
      <form onSubmit={createNewPost} className="w-[1000px] p-4 mt-[100px]">
        <div className="flex items-center justify-between">
          <BackMenu />
          <p className="text-sm font-semibold cursor-pointer" onClick={logout}>
            Logout
          </p>
        </div>
        <div className="w-full my-4">
          <label className="font-bold">
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
                src={image}
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
          <label className="font-bold">Tag</label>
          <input
            type="text"
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            placeholder="Categories"
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
          <label className="font-bold">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="w-full my-4">
          <label className="font-bold">Description</label>
          <Editor value={description} onChange={setDescription} required />
        </div>
        <button className="text-center w-full bg-tertiary rounded p-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
