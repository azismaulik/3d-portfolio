import { useContext, useState, useEffect } from "react";
import CardPost from "../components/CardPost";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/post");
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
    <div className="bg-primary pt-20 md:pt-40 px-4 min-h-screen">
      <h1 className="text-center font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 my-6">
        My Blog
      </h1>
      <div className="w-full flex justify-center gap-4 md:gap-10 flex-wrap">
        {loading && (
          <div className="w-full h-[30vh] flex justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
        {posts.length > 0 &&
          posts.map((post, index) => <CardPost key={index} {...post} />)}
      </div>
    </div>
  );
};

export default BlogList;
