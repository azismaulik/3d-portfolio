import { useEffect, useState } from "react";
import { styles } from "../styles";
import CardPost from "./CardPost";
import { useNavigate } from "react-router-dom";

const SectionBlog = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseurl = import.meta.env.VITE_APP_BASE_URL;

  const navigate = useNavigate();

  async function getBlog() {
    try {
      setLoading(true);
      const response = await fetch(`${baseurl}/post`);
      const blogs = await response.json();
      setBlog(blogs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);
  return (
    <section id="blog">
      <p className={`${styles.sectionSubText} text-center`}>
        What I have done so far
      </p>
      <h2 className={`${styles.sectionHeadText} text-center`}>
        My Recent Blog.
      </h2>

      <div className="mt-10 flex justify-center flex-wrap gap-4">
        {loading ? (
          <div className="w-full h-[300px] flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            {blog.slice(0, 3).map((blog) => (
              <CardPost key={blog._id} {...blog} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/blog")}
          className="cursor-pointer mt-6 py-2 px-6 rounded-md border border-secondary/25 bg-[#150F30] text-sm"
        >
          View All
        </button>
      </div>
    </section>
  );
};

export default SectionBlog;
