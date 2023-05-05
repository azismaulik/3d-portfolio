import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <section id="about">
      <div className="max-w-[1150px] mx-auto p-8 xl:p-0">
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm a skilled Web developer with experience in JavaScript, and
          expertise in frameworks like React.js and vue.js. I'm a quick learner
          and collaborate closely with clients to create efficient, scalable,
          and user-friendly solutions that solve real-world problems. Let's work
          together to bring your ideas to life!
        </motion.p>

        <div className="mt-10 md:mt-20 flex flex-wrap gap-10 justify-center sm:justify-start">
          {services.map((service, index) => (
            <div
              key={index}
              className="rounded-lg bg-[#1d1836] gap-2 p-2 flex flex-col justify-center items-center w-40 h-40 border border-secondary"
            >
              <img className="w-14" src={service.icon} alt="" />
              <h1 className="text-center text-sm">{service.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
