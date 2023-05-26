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
              ? "btn bg-ungu hover:bg-tertiary justify-start flex gap-2 items-center"
              : "btn bg-input/50 hover:bg-tertiary justify-start flex gap-2 items-center shadow shadow-ungu"
          }
          end
          to="/admin"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 12 12"
            className="w-5"
          >
            <g fill="none">
              <path
                d="M5.693 1.105a.5.5 0 0 1 .614 0l4.114 3.2A1.5 1.5 0 0 1 11 5.49V10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V7H5v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5.49c0-.464.214-.9.58-1.185l4.113-3.2zM6 2.133L2.193 5.094A.5.5 0 0 0 2 5.49V10h2V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h2V5.49a.5.5 0 0 0-.193-.396L6 2.134z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <span> home</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn bg-ungu hover:bg-tertiary justify-start flex gap-2 items-center"
              : "btn bg-input/50 hover:bg-tertiary justify-start flex gap-2 items-center shadow shadow-ungu"
          }
          to="/admin/blogs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            className="w-6"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6"></path>
              <circle cx="6" cy="18" r="2"></circle>
              <path d="M8 18V6a2 2 0 1 0-4 0v12"></path>
            </g>
          </svg>
          <span>blog</span>
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn bg-ungu hover:bg-tertiary justify-start flex gap-2 items-center"
              : "btn bg-input/50 hover:bg-tertiary justify-start flex gap-2 items-center shadow shadow-ungu"
          }
          to="/admin/projects"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1024 1024"
            className="w-6"
          >
            <defs></defs>
            <path
              d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8l86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"
              fill="currentColor"
            ></path>
            <path
              d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 512H160V232h704v440z"
              fill="currentColor"
            ></path>
          </svg>
          <span>project</span>
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
          {isOpen ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="#FFF"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4099 9L16.7099 2.71C16.8982 2.5217 17.004 2.2663 17.004 2C17.004 1.7337 16.8982 1.47831 16.7099 1.29C16.5216 1.1017 16.2662 0.995911 15.9999 0.995911C15.7336 0.995911 15.4782 1.1017 15.2899 1.29L8.99994 7.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L7.58994 9L1.28994 15.29C1.19621 15.383 1.12182 15.4936 1.07105 15.6154C1.02028 15.7373 0.994141 15.868 0.994141 16C0.994141 16.132 1.02028 16.2627 1.07105 16.3846C1.12182 16.5064 1.19621 16.617 1.28994 16.71C1.3829 16.8037 1.4935 16.8781 1.61536 16.9289C1.73722 16.9797 1.86793 17.0058 1.99994 17.0058C2.13195 17.0058 2.26266 16.9797 2.38452 16.9289C2.50638 16.8781 2.61698 16.8037 2.70994 16.71L8.99994 10.41L15.2899 16.71C15.3829 16.8037 15.4935 16.8781 15.6154 16.9289C15.7372 16.9797 15.8679 17.0058 15.9999 17.0058C16.132 17.0058 16.2627 16.9797 16.3845 16.9289C16.5064 16.8781 16.617 16.8037 16.7099 16.71C16.8037 16.617 16.8781 16.5064 16.9288 16.3846C16.9796 16.2627 17.0057 16.132 17.0057 16C17.0057 15.868 16.9796 15.7373 16.9288 15.6154C16.8781 15.4936 16.8037 15.383 16.7099 15.29L10.4099 9Z"
                fill="#FFFFFF"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="#FFF"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 2L19 2C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.480429 19.7071 0.292892C19.5196 0.105356 19.2652 0 19 0L9 0C8.73478 0 8.48043 0.105356 8.29289 0.292892C8.10536 0.480429 8 0.734784 8 1C8 1.26522 8.10536 1.51957 8.29289 1.70711C8.48043 1.89464 8.73478 2 9 2ZM19 10L1 10C0.734784 10 0.480429 10.1054 0.292892 10.2929C0.105356 10.4804 0 10.7348 0 11C0 11.2652 0.105356 11.5196 0.292892 11.7071C0.480429 11.8946 0.734784 12 1 12L19 12C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10V10ZM1 7L19 7C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5L1 5C0.734784 5 0.480429 5.10536 0.292892 5.29289C0.105356 5.48043 0 5.73478 0 6C0 6.26522 0.105356 6.51957 0.292892 6.70711C0.480429 6.89464 0.734784 7 1 7Z"
                fill="#FFFFFF"
              />
            </svg>
          )}
        </label>
      </div>
    </>
  );
};

export default Sidebar;
