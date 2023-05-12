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
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(`${baseurl}/post/${id}`).then((response) => {
        response.json().then((postInfo) => {
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

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
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
          <div className="w-full mt-8 mb-4">
            <label className="font-bold">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            />
          </div>
          <div className="w-full my-4">
            <label className="font-bold">Image</label>
            <input
              type="file"
              className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <div className="w-full my-4">
            <label className="font-bold">Content</label>
            <Editor value={content} onChange={setContent} />
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
