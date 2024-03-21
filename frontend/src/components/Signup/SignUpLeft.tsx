import { Link } from "react-router-dom";

import Form from "./Form";

const SignupRight = () => {
  return (
    <div className="w-100 h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Create an account</h1>
      <h1 className="opacity-40 text-xl">
        Already have an account?&nbsp;
        <Link to={"/signin"} className="inline underline">Login</Link>
      </h1>
      <Form />
    </div>
  );
};
export default SignupRight;
