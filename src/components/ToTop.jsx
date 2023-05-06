import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { toTop } from "../assets";

const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrolled = window.scrollY;
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isVisible && (
        <motion.div
          variants={slideIn("right", "tween", 0.5, 1)}
          className="fixed right-8 cursor-pointer bottom-8 md:right-16 md:bottom-16"
          onClick={handleToTop}
        >
          <img src={toTop} alt="" />
        </motion.div>
      )}
    </>
  );
};

export default ToTop;
