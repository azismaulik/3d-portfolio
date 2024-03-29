import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services, socials } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <section id="about">
      <div className="p-2 xl:p-0">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center sm:text-left`}>
            Introduction
          </p>
          <h2 className={`${styles.sectionHeadText} text-center sm:text-left`}>
            Overview.
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-sm text-center sm:text-left sm:text-[17px] max-w-5xl leading-6 sm:leading-[30px]"
        >
          I'm a skilled Web developer with experience in JavaScript or
          Wordpress, and expertise in frameworks like React.js and vue.js. And
          also i do UI / UX using figma. I'm a quick learner and collaborate
          closely with clients to create efficient, scalable, and user-friendly
          solutions that solve real-world problems. Let's work together to bring
          your ideas to life!
        </motion.p>

        <div className="flex gap-8 mt-8 justify-center sm:justify-start">
          {socials.map((social, index) => (
            <a key={index} href={social.link} target="_blank">
              <img
                src={social.img}
                alt=""
                className="object-cover w-10 hover:scale-125 transition animate-bounce"
              />
            </a>
          ))}
        </div>

        <div className="mt-6 md:mt-10 flex flex-wrap gap-10 justify-center sm:justify-start">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg bg-input/50 shadow shadow-violet-800 gap-2 p-4 flex flex-col justify-center items-center w-[40%] md:w-40 md:h-40"
            >
              <img className="w-14" src={service.icon} alt="" />
              <h1 className="text-center text-sm text-white">
                {service.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(About, "about");
