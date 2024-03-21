import { useMemo } from "react";
import convertIntoMarkup from "../pages/New/utils/convertToMarkup";
import { Link } from "react-router-dom";
import { Blog } from "../state/blogs";

const Card = ({ post }:{post:Blog}) => {
  const markUpContent = useMemo(() => {
    return convertIntoMarkup(post.content);
  }, [post]);
  return (
    <Link to={"/blog/"+post.id} className="m-1 my-5 w-80 sm:w-4/6 md:w-:4/6 xl:w-1/2 p-5 rounded-lg border-gray-400 border-solid border-2">
      <div
        style={{
          height: "300px",
          overflow: "hidden",
          userSelect: "none",
          cursor: "pointer",
        }}
        dangerouslySetInnerHTML={{ __html: markUpContent }}
      />
    </Link>
  );
};

export default Card;
