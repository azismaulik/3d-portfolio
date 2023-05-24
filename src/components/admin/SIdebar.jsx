import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../../assets";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function logout() {
    Cookies.remove("token");
    window.location.reload();
  }

  return (
    <>
      <div
        className={`${
          !isOpen
            ? "-translate-x-60 lg:-translate-x-0 fixed lg:sticky"
            : "fixed lg:sticky"
        } z-50 flex flex-col gap-2 transition top-0 bottom-0 w-60 lg:w-72 bg-input p-4 text-white font-semibold max-h-screen`}
      >
        <NavLink to="/" className="flex gap-2 items-center mb-6">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <p className="text-white text-sm font-bold cursor-pointer flex ">
            Azis Maulana Malik
          </p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn bg-ungu hover:bg-tertiary text-left"
              : "btn bg-input/50 hover:bg-tertiary text-left shadow shadow-ungu"
          }
          end
          to="/admin"
        >
          home
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn bg-ungu hover:bg-tertiary text-left"
              : "btn bg-input/50 hover:bg-tertiary text-left shadow shadow-ungu"
          }
          to="/admin/blogs"
        >
          blog
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn bg-ungu hover:bg-tertiary text-left"
              : "btn bg-input/50 hover:bg-tertiary text-left shadow shadow-ungu"
          }
          to="/admin/projects"
        >
          project
        </NavLink>
        <div
          onClick={logout}
          className="bg-[#001122] py-2 px-4 rounded-lg mt-auto flex justify-center items-center gap-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            width="18"
          >
            <path
              d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2z"
              fill="currentColor"
            ></path>
            <path
              d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6l-1.414-1.414z"
              fill="currentColor"
            ></path>
          </svg>
          <span> Log out</span>
        </div>
        <label
          onClick={() => setIsOpen(!isOpen)}
          className="btn bg-ungu hover:bg-tertiary drawer-button m-4 absolute -right-[80px] -top-2 lg:hidden"
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
