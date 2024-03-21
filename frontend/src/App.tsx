import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Error from "./components/Error";

import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import { useEffect } from "react";
import { setToken, setUser } from "./state/user";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import New from "./pages/New";

const App = () => {
  const user = useSelector((state: RootState) => state.user);
  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user") && cookies.token) {
      const user = JSON.parse(localStorage.getItem("user")!);
      const { token } = cookies;
      if (user.name && user.email) {
        dispatch(setUser(user));
      }

      if (token) {
        dispatch(setToken(token));
      }
    }
  }, []);
  useEffect(() => {
    if (user.name&& user.email)
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );
    if (user.token) {
      setCookie("token", user.token, { path: "/" });
    }
  }, [user]);
  useEffect(() => {
    if (cookies) {
      dispatch(setToken(cookies?.token));
    }
  }, [cookies]);

  return (
    <BrowserRouter>
      <Error />
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<New />} />
        <Route path="/new" element={<New />} />
        <Route path="/*" element={<Navigate to={"/blogs"} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
