import { Link } from "react-router-dom";

export const BackMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <Link className="italic underline text-sm" to="/">
        home
      </Link>
      <p className="text-sm">/</p>
      <Link className="italic underline text-sm" to="/blog">
        blog
      </Link>
    </div>
  );
};
