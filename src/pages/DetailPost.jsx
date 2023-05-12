import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BackMenu } from "../components/BackMenu";

const RecomendationPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;
  async function fetchPost() {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseurl}/post`);
      const json = await response.json();
      setPosts(json);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-[200px] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          {posts.map((post, index) => {
            return post._id !== id ? (
              <div key={index}>
                <Link to={`/blog/${post._id}`}>
                  <h1 className="font-semibold my-4 hover:scale-105 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 20 20"
                      className="w-6 inline mr-2"
                    >
                      <g fill="none">
                        <path
                          d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H6zm.75 2.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                    {post.title}
                  </h1>
                </Link>
              </div>
            ) : (
              ""
            );
          })}
        </>
      )}
    </>
  );
};

export default function DetailPost() {
  const [postInfo, setPostInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const myCookie = Cookies.get("token");

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  async function getPost() {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseurl}/post/${id}`);
      const post = await response.json();
      setPostInfo(post);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDelete(_id) {
    console.log("hapus " + _id);
  }

  useEffect(() => {
    getPost();
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="bg-primary py-20 md:pt-36 px-4 min-h-screen">
      <div className="container gap-10 justify-center mx-auto flex flex-wrap">
        <div className="md:flex-[0.8]">
          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              <BackMenu />
              <h1 className="text-2xl md:text-3xl mt-10 font-semibold text-center text-secondary md:w-[70%] md:leading-10 mx-auto">
                {postInfo.title}
              </h1>
              <div className="flex justify-center my-6">
                <img
                  className="md:w-1/2"
                  loading="lazy"
                  src={`${baseurl}/${postInfo.cover}`}
                  alt=""
                />
              </div>
              <div className="flex justify-between my-4">
                <div className="text-lg text-secondary font-semibold">
                  by @{postInfo.author.username}
                </div>
                {myCookie && (
                  <div className="edit-row">
                    <Link
                      className="edit-btn"
                      to={`/blog/edit/${postInfo._id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
                {myCookie && (
                  <div>
                    <label
                      htmlFor="my-modal-4"
                      className="rounded-lg cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 20 20"
                        width={20}
                        height={20}
                        className="text-secondary"
                      >
                        <g fill="none">
                          <path
                            d="M11.5 4a1.5 1.5 0 0 0-3 0h-1a2.5 2.5 0 0 1 5 0H17a.5.5 0 0 1 0 1h-.554L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.553 5H3a.5.5 0 0 1-.492-.41L2.5 4.5A.5.5 0 0 1 3 4h8.5zm3.938 1H4.561l1.282 11.115a1 1 0 0 0 .994.885h6.326a1 1 0 0 0 .993-.885L15.438 5zM8.5 7.5c.245 0 .45.155.492.359L9 7.938v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L8 14.062V7.939c0-.242.224-.438.5-.438zm3 0c.245 0 .45.155.492.359l.008.079v6.125c0 .241-.224.437-.5.437c-.245 0-.45-.155-.492-.359L11 14.062V7.939c0-.242.224-.438.5-.438z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </label>

                    <input
                      type="checkbox"
                      id="my-modal-4"
                      className="modal-toggle"
                    />
                    <label
                      htmlFor="my-modal-4"
                      className="modal cursor-pointer"
                    >
                      <label className="modal-box relative" htmlFor="">
                        <h3 className="text-base">
                          Yakin ingin menghapus postingan{" "}
                          <span className="font-bold"> {postInfo.title} ?</span>
                        </h3>
                        <div className="mt-6">
                          <button
                            onClick={handleDelete(postInfo._id)}
                            className="btn btn-error"
                          >
                            Hapus
                          </button>
                          <label
                            htmlFor="my-modal-4"
                            className="btn btn-primary ml-6"
                          >
                            Cancel
                          </label>
                        </div>
                      </label>
                    </label>
                  </div>
                )}

                {/* The button to open modal */}

                <time className="text-lg text-secondary font-semibold">
                  {format(new Date(postInfo.createdAt), "d MMM yyyy ")}
                </time>
              </div>

              <div
                className="text-[15px] leading-6 li"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
            </>
          )}
        </div>
        <div className="w-full lg:w-[300px]  text-secondary self-start sticky top-36 border-t-2 border-secondary pt-1">
          <h1 className="text-xl font-semibold">Other Post</h1>
          <div className="flex gap-2 mt-1">
            <div className="w-[40%] h-2 bg-secondary/50 rounded-lg"></div>
            <div className="w-[10%] h-2 bg-secondary/50 rounded-lg"></div>
          </div>
          <RecomendationPost />
        </div>
      </div>
    </div>
  );
}