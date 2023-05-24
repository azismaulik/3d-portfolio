import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardProject = ({ title, description, image, tag, _id }) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
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
    <div
      key={_id}
      className=" relative w-full md:max-w-[45%] xl:max-w-[30%] p-4 bg-input/90 rounded shadow shadow-violet-700"
    >
      <img
        className="w-full h-[200px] object-cover rounded"
        src={`${baseUrl}/${image}`}
        alt=""
      />
      <h1 className="font-bold mt-4 text-xl text-white">{title}</h1>
      <div
        className="text-sm leading-6 li line-clamp-5 mt-2"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex gap-2 mt-2">
        {tag?.map((item, i) => {
          return (
            <p key={i} className="text-xs text-white">
              #{item}
            </p>
          );
        })}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 cursor-pointer glass p-1 rounded text-white absolute top-1 left-1 hover:scale-[1.2] transition"
        onClick={() => navigate(`${_id}/edit`)}
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
      {modal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-black/40 flex justify-center items-center">
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
    </div>
  );
};

export default CardProject;
