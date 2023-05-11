import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { Navigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";
import { BackMenu } from "../components/BackMenu";
import Editor from "../components/Editor";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    fetch(`${baseurl}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch(`${baseurl}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Error updating post");
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
      <form onSubmit={updatePost} className="w-[1000px] p-4 mt-[100px]">
        <div className="flex items-center justify-between">
          <BackMenu />
          <p className="text-sm font-semibold cursor-pointer" onClick={logout}>
            Logout
          </p>
        </div>
        <div className="w-full my-4 ">
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
    </div>
  );
};

export default EditPost;
