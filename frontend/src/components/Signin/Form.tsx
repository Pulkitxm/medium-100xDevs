import React, { useState } from "react";

import { apiUrl } from "../../config";
import axios from "axios";
import { SignInInput } from "medium-common-pulkit";
import { setUser } from "../../state/user";
import { useDispatch } from "react-redux";
import { hideError, showError } from "../../state/error";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;
      const data: SignInInput = { email, password };
      if (email && password) {
        const res = await axios.put(`${apiUrl}/api/v1/user`, data);
        const token = res?.data?.token;
        const name = res?.data?.name;
        if (token) {
          setLoading(false);
          dispatch(setUser({ email,name, token }));
        }
      } else {
        setLoading(false);
        dispatch(showError("Enter all the fields to sign in"));
        setTimeout(() => {
          dispatch(hideError());
        }, 5000);
      }
    } catch (err) {
      setLoading(false);
      dispatch(showError("Error while signing in. Please try again."));
      setTimeout(() => {
        dispatch(hideError());
      }, 5000);
    }
  };
  return (
    <form
      className="w-3/5 flex flex-col justify-center"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="m-1 mt-5 font-bold text-lg">
        Email
      </label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter your email"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg"
      />

      <label htmlFor="password" className="m-1 mt-5 font-bold text-lg">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        className="outline-none border-b-2 border-gray-400 m-1 text-lg"
      />

      <button
        type="submit"
        className="m-5 w-full bg-gray-900 text-white h-14 rounded  mx-auto"
      >
        {loading ? (
          <div className="m-auto w-7 h-7 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default Form;
