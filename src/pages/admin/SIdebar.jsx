import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../assets";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`${
          !isOpen ? "-translate-x-60 fixed" : "fixed md:sticky"
        } flex flex-col gap-2 transition bottom-0 top-0 w-60 bg-tertiary p-4 text-white font-semibold`}
      >
        <div className="flex gap-2 items-center mb-6">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <p className="text-white text-sm font-bold cursor-pointer flex ">
            Azis Maulana Malik
          </p>
        </div>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-700 py-2 px-4 rounded-lg block"
              : "bg-violet-700/20 py-2 px-4 rounded-lg block"
          }
          end
          to="/admin"
        >
          home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-700 py-2 px-4 rounded-lg block"
              : "bg-violet-700/20 py-2 px-4 rounded-lg block"
          }
          to="/admin/projects"
        >
          projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-violet-700 py-2 px-4 rounded-lg block"
              : "bg-violet-700/20 py-2 px-4 rounded-lg block"
          }
          to="/admin/blogs"
        >
          blogs
        </NavLink>
        <label
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-primary drawer-button m-4 absolute -right-[80px] top-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
              fill="currentColor"
            ></path>
          </svg>
        </label>
      </div>
    </>
  );
};

export default Sidebar;
