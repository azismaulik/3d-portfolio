import React, { useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CardPost = ({ _id, title, summary, cover, createdAt, categories }) => {
  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          ease: "easeInOut",
          duration: 1,
        }}
        className={`w-[400px] ${
          window.location.href.includes("blog")
            ? "glass"
            : "bg-input/60 shadow shadow-violet-900"
        } my-4 rounded-md relative`}
      >
        <Link className="relative" to={`/blog/${_id}`}>
          <img
            className=" object-cover object-top w-full h-[250px] rounded-t-md"
            loading="lazy"
            src={cover}
            alt={title}
          />
        </Link>
        <div className="p-4 text flex flex-col justify-center gap-1">
          <div className="flex gap-2">
            {categories?.map((cat, i) => (
              <p
                className={`text-[10px] my-1 px-3 rounded-full border border-secondary`}
                key={i}
              >
                {cat}
              </p>
            ))}
          </div>
          <Link to={`/blog/${_id}`}>
            <h1 className="text-white text-lg font-semibold capitalize">
              {title}
            </h1>
          </Link>
          <div
            className="text-sm line-clamp-4"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
          <Link
            to={`/blog/${_id}`}
            className="text-xs mt-2 italic text-white underline"
          >
            Read more {"->"}
          </Link>

          <div className="flex text-sm justify-between mt-4">
            <p>{format(new Date(createdAt), "d-MM-yyyy ")}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CardPost;
