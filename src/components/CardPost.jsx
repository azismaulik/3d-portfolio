import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const CardPost = ({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) => {
  return (
    <div className="max-w-[400px] bg-tertiary my-4 rounded-md">
      <Link to={`/blog/${_id}`}>
        <img
          className="object-fill object-top w-full h-[250px] rounded-t-md"
          src={"http://localhost:5000/" + cover}
          alt={title}
        />
      </Link>
      <div className="p-4 text flex flex-col justify-center gap-3">
        <Link to={`/blog/${_id}`}>
          <h1 className="text-lg font-semibold">{title}</h1>
        </Link>
        <p className="line-clamp-4 text-sm">{summary}</p>
        <Link to={`/blog/${_id}`} className="text-sm italic underline">
          Read more {"->"}
        </Link>
        <div className="flex justify-between mt-8">
          <p>By: {author.username}</p>
          <p>{format(new Date(createdAt), "d MMM yyyy ")}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
