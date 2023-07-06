import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="bg-hero-pattern bg-cover bg-fixed py-20 pt-32 md:pt-40 px-4 min-h-screen">
      <Navbar />
      <h1 className="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-[#4D4F59] to-white mb-8">
        My Blog
      </h1>

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
