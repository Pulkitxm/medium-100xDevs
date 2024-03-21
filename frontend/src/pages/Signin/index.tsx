import SignInRight from "../../components/Signin/SignInRight";
import SignInLeft from "../../components/Signin/SignInLeft";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.token) {
      const url= localStorage.getItem("redirect") as string;
      if(url){
        localStorage.removeItem("redirect");
        navigate(url);
      }else{
        navigate("/blogs");
      }
    }
  }, [user, []]);
  return (
    <div className="w-screen h-screen grid grid-rows-1 lg:grid-cols-2 grid-cols-1">
      <SignInLeft />
      <SignInRight />
    </div>
  );
};
export default Signin;
