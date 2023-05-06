import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services, socials } from "../constants";
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

        <div className="flex gap-8 mt-8">
          {socials.map((social, index) => (
            <a key={index} href={social.link} target="_blank">
              <img
                src={social.img}
                alt=""
                className="object-cover w-10 hover:scale-125 transition"
              />
            </a>
          ))}
        </div>

        <div className="mt-6 md:mt-10 flex flex-wrap gap-10">
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
