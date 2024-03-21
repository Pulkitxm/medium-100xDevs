import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";

import Card from "../../components/Card";
import axios from "axios";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { Blog, setBlogs } from "../../state/blogs";
import Create from "../../components/Create";

const DashBoard = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const blogs = useSelector((state: RootState) => state.blogs);
  useEffect(() => {
    if (user.token && blogs.length === 0)
      axios
        .get(apiUrl + "/api/v1/blog", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          const data = res.data;
          if (data && typeof data === "object" && data.length > 0) {
            dispatch(
              setBlogs(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.map((i: any): Blog => {
                  return {
                    title: i.title,
                    content: i.content,
                    imgLink: i.imgLink,
                    author: i.author.name,
                    published: i.published,
                    date: i.date,
                    id: i.id
                  };
                })
              )
            );
          }
        });
  }, [user]);

  useEffect(() => {
    if (!user.token) navigate("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, []]);
  return (
    <div className="w-screen flex flex-col items-center justify-center overflow-y-auto pt-10">
      <div className="h-20"></div>
      {blogs.length === 0 ? (
        <>
          <div className="m-auto w-7 h-7 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <div className="text-2xl font-bold text-gray-500">Loading Blogs</div>
        </>
      ) : (
        blogs.map((post, i) => {
          return (<Card post={post} key={i} />);
        })
      )}
      <Create />
    </div>
  );
};

export default DashBoard;
