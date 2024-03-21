import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reSetUser } from "../state/user";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies(["token"]);

  const handelSignOut = () => {
    dispatch(reSetUser());
    localStorage.removeItem("user");
    setCookie("token", "", { path: "/" });
  };

  return (
    <div className="fixed top-0 w-screen h-20 bg-white border-b-2 z-50">
      <div className="w-4/5 m-auto h-full flex items-center justify-between bg-white">
        <Link to={"/blogs"} className="font-bold text-2xl">Medium By-Pulkit</Link>
        <div>
          {user.token ? (
            <div className="flex items-center">
              <p className="cursor-pointer" onClick={handelSignOut}>SignOut</p>
              <div className="mx-2 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {user.name && user.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
          ) : (
            <>
              <Link to={"/signup"}>SignUp</Link>/
              <Link to={"/signin"}>Signin</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
