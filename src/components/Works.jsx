import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Works = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-8 xl:p-0 mt-20">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <div
            key={index}
            className="p-6 w-full sm:w-80 bg-[#150F30] rounded-xl"
          >
            <img
              className="rounded-lg h-48 w-full object-fill"
              src={project.image}
              alt=""
            />
            <h1 className="mt-6 text-xl font-semibold">{project.name}</h1>
            <p className="mt-2 text-sm text-gray-300 leading-6">
              {project.description}
            </p>
            <div className="flex gap-2">
              {project.tags?.map((tag, index) => (
                <p key={index} className={`${tag.color} text-sm mt-4`}>
                  #{tag.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
