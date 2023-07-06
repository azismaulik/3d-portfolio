import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const CardProject = ({ title, description, link, _id, image, tag }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  async function handleDelete(_id) {
    try {
      const response = await fetch(`${baseUrl}/project/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Lakukan tindakan setelah berhasil menghapus postingan, misalnya memperbarui tampilan atau memuat ulang data
        alert("Project berhasil dihapus");
        window.location.reload();
        // ... lakukan aksi setelah penghapusan
      } else {
        console.log("Terjadi kesalahan saat menghapus project");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus project:", error);
    }
  }
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        ease: "easeInOut",
        duration: 1,
      }}
      className="p-4 w-full md:w-80 bg-input/80 shadow shadow-violet-800 rounded relative"
    >
      <a target="_blank" href={link}>
        <img
          className="rounded-lg h-48 w-full object-fill hover:scale-105 transition"
          src={image}
          alt=""
        />
      </a>
      <a target="_blank" href={link}>
        <h1 className="mt-6 text-white text-xl font-semibold capitalize">
          {title}
        </h1>
      </a>
      <p
        className="mt-2 text-sm text-gray-300 leading-6"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex gap-2">
        {tag?.map((tag, i) => (
          <p key={i} className={` text-sm mt-4`}>
            #{tag}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [tampil, setTampil] = useState(3);
  const [isTampil, setIsTampil] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL;

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/project`);
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleBtn = () => {
    setTampil(tampil == 3 ? 5 : 3);
    setIsTampil(!isTampil);
  };

  return (
    <section id="projects">
      <div className="p-2 xl:p-0 mt-10 sm:mt-20">
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center sm:text-left`}>
            My work
          </p>
          <h2 className={`${styles.sectionHeadText} text-center sm:text-left`}>
            Projects.
          </h2>
        </motion.div>

        <div className="w-full flex">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-sm sm:text-[17px] text-center sm:text-left max-w-5xl leading-6 sm:leading-[30px]"
          >
            Following projects showcases my skills and experience through
            real-world examples of my work. Each project is briefly described
            with links to code repositories and live demos in it. It reflects my
            ability to solve complex problems, work with different technologies,
            and manage projects effectively.
          </motion.p>
        </div>
        {loading ? (
          <div className="w-full h-[20vh] flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="mt-20 flex flex-wrap justify-center gap-4 md:gap-8">
            {projects?.slice(0, tampil).map((project, index) => (
              <CardProject key={index} {...project} />
            ))}
          </div>
        )}
        {projects.length > 3 ? (
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={handleBtn}
              className="cursor-pointer py-2 px-6 rounded-md border border-secondary/25 glass text-sm"
            >
              {isTampil ? "Hide" : "View All"}
            </button>
          </div>
        ) : (
          ""
        )}

        {!projects.length && !loading && (
          <div className="w-full h-[10vh] flex justify-center items-center">
            <h1 className="text-secondary text-xl font-bold text-center">
              Project tidak ada / Kesalahan server
            </h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, "projects");
