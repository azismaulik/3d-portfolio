import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const myCookie = Cookies.get("token");

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  async function login(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${baseurl}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("wrong credentials");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (myCookie) {
    return <Navigate to="/blog" />;
  }

  if (redirect) {
    return <Navigate to={"/blog/create"} />;
  }

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center">
      <form className="w-[500px] p-4 mt-[100px]" onSubmit={login}>
        <div className="w-full my-4 ">
          <label className="font-bold">username</label>
          <input
            type="text"
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-full my-4 relative">
          <label className="font-bold">password</label>
          <input
            type={show ? "text" : "password"}
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              className="absolute right-4 top-[52%] w-5 cursor-pointer"
              onClick={() => setShow(false)}
            >
              <circle cx="256" cy="256" r="64" fill="currentColor"></circle>
              <path
                d="M394.82 141.18C351.1 111.2 304.31 96 255.76 96c-43.69 0-86.28 13-126.59 38.48C88.52 160.23 48.67 207 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416c49 0 95.85-15.07 139.3-44.79C433.31 345 469.71 299.82 496 256c-26.38-43.43-62.9-88.56-101.18-114.82zM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 640 512"
              className="absolute right-4 top-[52%] w-5 cursor-pointer"
              onClick={() => setShow(true)}
            >
              <path
                d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07a32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </div>
        <button className="text-center w-full bg-tertiary rounded p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
