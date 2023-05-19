import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const CardPost = ({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
  categories,
}) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  const myCookie = Cookies.get("token");
  async function handleDelete(_id) {
    try {
      const response = await fetch(`${baseurl}/post/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        // Lakukan tindakan setelah berhasil menghapus postingan, misalnya memperbarui tampilan atau memuat ulang data
        alert("Postingan berhasil dihapus");
        window.location.reload();
        // ... lakukan aksi setelah penghapusan
      } else {
        console.log("Terjadi kesalahan saat menghapus postingan");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus postingan:", error);
    }
  }

  const [modal, setModal] = useState(false);
  return (
    <>
      {modal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black/60 flex justify-center items-center">
          <div className="w-[400px] bg-secondary rounded text-primary p-4">
            <h1>
              yakin ingin menghapus{" "}
              <span className="font-semibold"> {title}?</span>
            </h1>
            <div className="mt-4">
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-error"
              >
                hapus
              </button>
              <button onClick={() => setModal(false)} className="btn btn-ghost">
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          ease: "easeInOut",
          duration: 1,
        }}
        className="w-[400px] bg-tertiary my-4 rounded-md relative"
      >
        {myCookie && (
          <div
            className="absolute p-1 rounded bg-tertiary cursor-pointer top-2 right-2 z-10"
            onClick={() => setModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 20 20"
              className="w-6"
            >
              <g fill="none">
                <path
                  d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </div>
        )}

        <Link className="relative" to={`/blog/${_id}`}>
          <img
            className=" object-cover object-top w-full h-[250px] rounded-t-md"
            loading="lazy"
            src={`${baseurl}/${cover}`}
            alt={title}
          />
        </Link>
        <div className="p-4 text flex flex-col justify-center gap-3">
          <div className="flex gap-2">
            {categories?.map((cat, i) => (
              <p
                className={`text-[10px] py-1 px-3 rounded-full border border-secondary`}
                key={i}
              >
                {cat}
              </p>
            ))}
          </div>
          <Link to={`/blog/${_id}`}>
            <h1 className="text-lg font-semibold">{title}</h1>
          </Link>
          <p className="line-clamp-4 text-sm">{summary}</p>
          <Link to={`/blog/${_id}`} className="text-sm italic underline">
            Read more {"->"}
          </Link>

          <div className="flex justify-between mt-4">
            <p>By: {author.username}</p>
            <p>{format(new Date(createdAt), "d-MM-yyyy ")}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CardPost;
