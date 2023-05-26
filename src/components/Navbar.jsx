import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import Cookies from "js-cookie";
import Progress from "../hooks/ProgressBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const myCookie = Cookies.get("token");

  const completion = Progress();

  function logout() {
    Cookies.remove("token");
    window.location.reload();
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 70) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Azis Maulana Malik
          </p>
        </a>

        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-[#A437DB]" : "text-white/80"
              } hover:text-[#A437DB] text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`/#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li
            className={`${
              window.location.href.includes("blog")
                ? "text-[#A437DB]"
                : "text-white/80"
            }
             hover:text-[#A437DB] text-[18px] font-medium cursor-pointer`}
          >
            <a href="/blog">blog</a>
          </li>
          {myCookie && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 496 512"
                  className="text-white w-8 cursor-pointer"
                >
                  <path
                    d="M248 8C111 8 0 119 0 256s111 248 248 248s248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88s-88-39.4-88-88s39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2c18.8-35.4 55.6-59.8 98.5-59.8c2.4 0 4.8.4 7.1 1.1c13 4.2 26.6 6.9 40.9 6.9c14.3 0 28-2.7 40.9-6.9c2.3-.7 4.7-1.1 7.1-1.1c42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                    fill="currentColor"
                  ></path>
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-input rounded-box w-52 mt-2"
              >
                <li
                  onClick={() => navigate("/admin")}
                  className="text-white/80
             hover:text-white text-sm font-medium cursor-pointer"
                >
                  <a>Admin</a>
                </li>
                <li
                  onClick={logout}
                  className="text-white/80
             hover:text-white text-sm font-medium cursor-pointer"
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </ul>

        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-input/90 shadow shadow-violet-800 absolute top-20 -right-4 mx-4 my-2 min-w-[140px] z-10 rounded-l-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-violet-800" : "text-white"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`/#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li
                className="text-secondary
             hover:text-white text-[18px] font-medium cursor-pointer"
              >
                <a href="/blog">blog</a>
              </li>
              {myCookie && (
                <li
                  onClick={logout}
                  className="text-secondary
             hover:text-white text-[18px] font-medium cursor-pointer"
                >
                  <a>Logout</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <span
        style={{ transform: `translateX(${completion - 105}%)` }}
        className={`absolute h-[2px] w-full bg-gradient-to-r from-tertiary to-secondary bottom-0`}
      ></span>
    </nav>
  );
};

export default Navbar;
