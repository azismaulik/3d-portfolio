import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(`${baseurl}/post/${id}`).then((response) => {
        response.json().then((postInfo) => {
          setCategories(postInfo.categories);
          setImage(postInfo.cover);
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const categoryString = JSON.stringify(categories);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("category", categoryString);
    data.append("content", content);
    data.append("id", id);
    if (files?.[0]) {
      data.append("file", files?.[0]);
    }
    try {
      const response = await fetch(`${baseurl}/post/${id}`, {
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
    return <Navigate to={"/blog/" + id} />;
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
    <div className="w-full min-h-screen bg-primary flex justify-center">
      {isLoading ? (
        <div className="w-full min-h-screen flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        <form onSubmit={updatePost} className="w-[1000px] p-4 mt-[100px]">
          <div className="flex items-center justify-between">
            <Link to={`/blog/${id}`} className="flex items-center">
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
                  src={`${baseurl}/${image}`}
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
            <label className="font-bold">Category</label>
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
            <label className="font-bold">Summary</label>
            <input
              type="text"
              className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
              placeholder="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="w-full my-4">
            <label className="font-bold">Content</label>
            <Editor value={content} onChange={setContent} required />
          </div>
          <button className="text-center w-full bg-tertiary rounded p-2">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditPost;
