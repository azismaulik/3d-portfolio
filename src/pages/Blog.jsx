import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const apiKey = import.meta.env.VITE_APP_BLOGGER_API_KEY;
  const blogId = import.meta.env.VITE_APP_BLOGGER_BLOG_ID;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`
        );
        setBlogs(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogs();
  }, []);

  console.log(blogs);
  return (
    <div className="bg-primary">
      <h1>List of blogs:</h1>
      <ul>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <p key={blog.id}>{blog.title}</p>
            <div
              dangerouslySetInnerHTML={{ __html: blog.content }}
              className="w-[600px] line-clamp-6"
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
