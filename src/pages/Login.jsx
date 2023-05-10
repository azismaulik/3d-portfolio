import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
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
        <div className="w-full my-4">
          <label className="font-bold">password</label>
          <input
            type="password"
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="text-center w-full bg-tertiary rounded p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
