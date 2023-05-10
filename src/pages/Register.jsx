import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  }
  return (
    <div className="w-full min-h-screen bg-primary flex justify-center">
      <form onSubmit={register} className="w-[500px] p-4 mt-[100px]">
        <div className="w-full my-4 ">
          <label className="font-bold">username</label>
          <input
            type="text"
            value={username}
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="w-full my-4">
          <label className="font-bold">password</label>
          <input
            type="password"
            value={password}
            className="w-full p-2 rounded my-2 bg-tertiary text-white text-sm border border-secondary"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button className="text-center w-full bg-tertiary rounded p-2">
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Register;
