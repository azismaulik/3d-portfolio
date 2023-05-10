import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import { BackMenu } from "../components/BackMenu";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

const Create = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [user, setUser] = useState(userInfo?.username);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const myCookie = Cookies.get("token");

  function logout() {
    Cookies.remove("token");
    window.location.reload();
  }

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (!myCookie) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={"/blog"} />;
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
          <ReactQuill
            className="bg-tertiary rounded"
            theme="snow"
            formats={formats}
            value={content}
            onChange={(newValue) => setContent(newValue)}
          />
        </div>
        <button className="text-center w-full bg-tertiary rounded p-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default Create;
// useEffect(() => {
//   fetch("http://localhost:5000/profile", {
//     credentials: "include",
//   }).then((response) => {
//     response.json().then((userInfo) => {
//       setUserInfo(userInfo);
//     });
//   });
// }, []);

// function logout() {
//   fetch("http://localhost:5000/logout", {
//     credentials: "include",
//     method: "POST",
//   });
//   setUser(null);
// }
