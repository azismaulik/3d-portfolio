import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const CardProject = ({ title, description, link, _id, image, tag }) => {
  const [modal, setModal] = useState(false);
  const myCookie = Cookies.get("token");
  const navigate = useNavigate();
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
          src={`${baseUrl}/${image}`}
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
        {tag?.map((tag) => (
          <p key={_id} className={` text-sm mt-4`}>
            #{tag}
          </p>
        ))}
      </div>
      {myCookie && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 cursor-pointer glass p-1 rounded text-white absolute top-1 left-1 hover:scale-[1.2] transition"
            onClick={() => navigate(`/admin/projects/${_id}/edit`)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
          <div
            className="absolute cursor-pointer glass p-1 rounded text-white top-1 right-1 z-10"
            onClick={() => setModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
              className="w-5"
            >
              <g fill="none">
                <path
                  d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        </>
      )}
      {modal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/40 z-50 flex justify-center items-center">
          <div className="w-[400px] rounded bg-ungu text-white p-4">
            <h1 className="text-xl">
              yakin ingin menghapus <span className="font-bold"> {title}?</span>
            </h1>
            <div className="mt-4">
              <button
                onClick={() => handleDelete(_id)}
                className="py-2 px-4 rounded bg-red-700 text-white text-sm font-semibold"
              >
                hapus
              </button>
              <button
                onClick={() => setModal(false)}
                className="btn btn-ghost btn-sm"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
