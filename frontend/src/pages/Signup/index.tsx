import SignUpRight from "../../components/Signup/SignUpRight";
import SignUpLeft from "../../components/Signup/SignUpLeft";

import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const navigate= useNavigate();
  const user= useSelector((state:RootState) => state.user);
  useEffect(() => {
    if(user.token)
      navigate("/blogs");
  }, [user,[]]);
  return (
    <div className="w-screen h-screen grid grid-rows-1 lg:grid-cols-2 grid-cols-1">
      <SignUpLeft />
      <SignUpRight />
    </div>
  );
};
export default Signup;
