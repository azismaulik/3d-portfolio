import { Link } from "react-router-dom";

export const BackMenu = () => {
  return (
    <Link to={-1} className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        width="20"
      >
        <path
          d="M11.67 3.87L9.9 2.1L0 12l9.9 9.9l1.77-1.77L3.54 12z"
          fill="currentColor"
        ></path>
      </svg>
      <p>back</p>
    </Link>
  );
};
