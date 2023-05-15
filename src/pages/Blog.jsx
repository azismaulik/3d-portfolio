import { useContext, useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Navbar } from "../components";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(6);

  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch(`${baseurl}/post`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const myCookie = Cookies.get("token");

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-primary py-20 md:pt-40 px-4 min-h-screen">
      <Navbar />
      <h1 className="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-900 to-pink-800 my-6">
        My Blog
      </h1>
      {myCookie && (
        <div className="flex justify-center">
          <Link className="px-4 py-2 rounded bg-tertiary" to="create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1024 1024"
              className="w-6"
            >
              <path
                d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"
                fill="currentColor"
              ></path>
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
        </div>
      )}
      <div className="container mx-auto flex justify-center gap-4 md:gap-10 flex-wrap">
        {loading && (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
        {posts.length > 0 &&
          posts
            .slice(0, view)
            .map((post, index) => <CardPost key={index} {...post} />)}
      </div>
      <div className="flex justify-center">
        {posts.length <= view ? (
          ""
        ) : (
          <button
            onClick={() => setView(view + 6)}
            className="cursor-pointer mt-6 py-2 px-6 rounded-md border border-secondary/25 bg-[#150F30] text-sm"
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
