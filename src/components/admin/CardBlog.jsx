import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const CardBlog = ({
  title,
  cover,
  summary,
  _id,
  createdAt,
  author,
  categories,
}) => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [modal, setModal] = useState(false);
  async function handleDelete(_id) {
    try {
      const response = await fetch(`${baseUrl}/post/${_id}`, {
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
  return (
    <div className=" relative w-full md:w-[45%] p-4 bg-tertiary rounded shadow shadow-violet-700">
      <img
        className="w-full h-[200px] object-cover rounded"
        src={`${baseUrl}/${cover}`}
        alt=""
      />
      <h1
        onClick={() => navigate(`/blog/${_id}`)}
        className="cursor-pointer font-bold line-clamp-1 mt-2 text-xl"
      >
        {title}
      </h1>
      <p className="text-sm my-2 line-clamp-3">{summary}</p>
      <div className="flex gap-2">
        {categories?.map((cat, i) => {
          return (
            <p
              key={i}
              className="px-2 rounded-full text-xs border border-secondary"
            >
              #{cat}
            </p>
          );
        })}
      </div>
      <div className="mt-4 text-xs text-white/90 font-semibold font-pangolin flex justify-between items-center">
        <p>By {author.username}</p>
        <p>{format(new Date(createdAt), "d-MM-yyyy ")}</p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 cursor-pointer absolute -top-2 -right-2 hover:scale-[1.2] transition"
        onClick={() => navigate(`${_id}/edit`)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
      <div
        className="absolute p-1 rounded cursor-pointer -top-2 -left-2 z-10"
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
      {modal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-20 flex justify-center items-center">
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
    </div>
  );
};

export default CardBlog;
