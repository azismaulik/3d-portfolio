import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BackMenu } from "../components/BackMenu";
import { Navbar } from "../components";

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
          {posts.slice(0, 6).map((post, index) => {
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

  useEffect(() => {
    getPost();
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="bg-hero-pattern bg-cover bg-fixed py-20 pt-36 px-4 min-h-screen">
      <Navbar />
      <div className="container gap-10 justify-center mx-auto flex flex-wrap">
        <div className="md:flex-[0.8]">
          {isLoading ? (
            <div className="flex items-center justify-center h-[50vh]">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              <BackMenu />
              <h1 className="text-2xl md:text-3xl mt-10 font-semibold text-center text-secondary md:w-[80%] md:leading-10 mx-auto">
                {postInfo.title}
              </h1>
              <p className="mx-auto text-center mt-4 text-secondary">
                {format(new Date(postInfo.createdAt), "d-MM-yyyy ")}
              </p>
              <div className="text-center text-sm text-secondary my-4">
                by @{postInfo.author.username}
              </div>
              <figure className="relative">
                <img
                  className="w-full max-h-[500px] object-cover"
                  loading="lazy"
                  src={`${baseurl}/${postInfo.cover}`}
                  alt=""
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  {postInfo.categories?.map((cat, i) => {
                    return (
                      <p
                        key={i}
                        className="bg-primary z-10 py-[2px] px-4 rounded-full text-xs border border-secondary"
                      >
                        {cat}
                      </p>
                    );
                  })}
                </div>
              </figure>
              <div className="flex justify-between my-4">
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

                {/* The button to open modal */}
              </div>

              <div
                className="text-[15px] leading-6 li"
                dangerouslySetInnerHTML={{ __html: postInfo.content }}
              />
            </>
          )}
        </div>
        <div className="w-full lg:w-[300px]  text-secondary self-start sticky top-36">
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
