import React, { useEffect, useState } from "react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

import Progress from "../hooks/ProgressBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const completion = Progress();

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
              window.location.href.includes("playgrounds")
                ? "text-[#A437DB]"
                : "text-white/80"
            }
                   hover:text-[#A437DB] text-[18px] font-medium cursor-pointer`}
          >
            <a href="/playgrounds">Playgrounds</a>
          </li>
          <li
            className={`${
              window.location.href.includes("blog")
                ? "text-[#A437DB]"
                : "text-white/80"
            }
             hover:text-[#A437DB] text-[18px] font-medium cursor-pointer`}
          >
            <a href="/blog">Blog</a>
          </li>
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
                className="text-white
             hover:text-white text-[18px] font-medium cursor-pointer"
              >
                <a href="/playgrounds">Playgrounds</a>
              </li>
              <li
                className="text-white
             hover:text-white text-[18px] font-medium cursor-pointer"
              >
                <a href="/blog">blog</a>
              </li>
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
